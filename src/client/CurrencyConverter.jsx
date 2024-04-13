import { useEffect, useState } from 'react';
import { formatCurrency } from './utils';
import useCurrenciesData from './hooks/useCurrenciesData';

function CurrencyConverter() {
  const [inputAmount, setInputAmount] = useState();
  const [convertedAmount, setConvertedAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [conversionRate, setConversionRate] = useState();
  const [history, setHistory] = useState([]);

  // example of custom hook to fetch currencies data on mount
  const { currencies } = useCurrenciesData();

  useEffect(() => {
    setFromCurrency(currencies[0]);
    setToCurrency(currencies[0]);
  }, [currencies]);

  useEffect(() => {
    const fetchRate = async () => {
      if (fromCurrency && toCurrency) {
        const res = await fetch(`/currencies/${fromCurrency}`);
        const rates = await res.json();
        const rate = rates[toCurrency];
        setConversionRate(rate);
      }
    };

    fetchRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    handleHistoryFetch();
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputAmount(value);
  };

  const handleFromCurrencyChange = (e) => {
    const { value } = e.target;
    setFromCurrency(value);
    setConvertedAmount(null);
  };

  const handleToCurrencyChange = (e) => {
    const { value } = e.target;
    setToCurrency(value);
    setConvertedAmount(null);
  };

  const handleHistoryFetch = async () => {
    const response = await fetch('/history');
    const data = await response.json();
    setHistory(data);
  };

  const handleConvertCurrency = (e) => {
    e.preventDefault();
    if (!inputAmount) return;

    const formattedValue = formatCurrency(
      conversionRate,
      inputAmount,
      toCurrency
    );

    setConvertedAmount(formattedValue);
    addConversionToHistory(formattedValue);
  };

  const addConversionToHistory = async (toAmount) => {
    try {
      const response = await fetch('/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromAmount: `${fromCurrency} ${inputAmount}`,
          toAmount,
          timestamp: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save history');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex-row">
        <div className="flex-row">
          <div className="padding-h align-items-c">Amount:</div>

          <input onChange={handleInputChange} type="number" min={0} />

          <select onChange={handleFromCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency} name={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-row">
          <div className="padding-h align-items-c">Convert to:</div>

          <select className="padding-5" onChange={handleToCurrencyChange}>
            {currencies.map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="margin-l"
          onClick={handleConvertCurrency}
          type="button"
        >
          Calculate
        </button>
      </div>
      <hr />

      <div className="padding-h">
        <b>{convertedAmount}</b>
      </div>
      <>
        {history.map((item, index) => {
          const { fromAmount, toAmount, timestamp } = JSON.parse(item);
          const date = new Date(timestamp);
          const dateStr = date.toDateString();
          const timeStr = date.toLocaleTimeString([], {
            timeZoneName: 'short',
          });

          return (
            <div className="padding-h" key={index}>
              {fromAmount} =&gt; {toAmount} | {dateStr} | {timeStr}
            </div>
          );
        })}
      </>
    </>
  );
}

export default CurrencyConverter;
