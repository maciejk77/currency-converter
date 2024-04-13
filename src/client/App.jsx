import { useEffect, useState } from 'react';

function App() {
  const [amount, setAmount] = useState();
  const [exchangedAmount, setExchangedAmount] = useState();

  const [baseCurrency, setBaseCurrency] = useState();
  const [currencies, setCurrencies] = useState([]);
  const [targetCurrency, setTargetCurrency] = useState('');
  const [targetRate, setTargetRate] = useState();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/currencies')
      .then((res) => res.json())
      .then((data) => setCurrencies(data));
  }, []);

  useEffect(() => {
    setBaseCurrency(currencies[0]);
    setTargetCurrency(currencies[0]);
  }, [currencies]);

  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      fetch(`/currencies/${baseCurrency}`)
        .then((res) => res.json())
        .then((rates) => rates[targetCurrency])
        .then((rate) => setTargetRate(rate));
    }
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    handleHistoryFetch();
  }, []);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleBaseCurrencyChange = (e) => {
    const { value } = e.target;
    setBaseCurrency(value);
    setExchangedAmount(null);
  };

  const handleTargetCurrencyChange = (e) => {
    const { value } = e.target;
    setTargetCurrency(value);
    setExchangedAmount(null);
  };

  const handleExchange = (e) => {
    e.preventDefault();
    if (!amount) return;

    const value = targetRate * amount;
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: targetCurrency,
    });

    const formattedValue = formatter.format(value);
    setExchangedAmount(formattedValue);
    updateHistoryWithExchangedAmount(formattedValue);
  };

  const updateHistoryWithExchangedAmount = (targetAmount) => {
    try {
      fetch('/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baseAmount: `${baseCurrency} ${amount}`,
          targetAmount,
          timestamp: new Date(),
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleHistoryFetch = async () => {
    const response = await fetch('/history');
    const data = await response.json();
    setHistory(data);
  };

  return (
    <>
      <div className="flex-row">
        <div className="flex-row">
          <div className="padding-h align-items-c">Amount:</div>

          <input onChange={handleInputChange} type="number" min={0} />

          <select onChange={handleBaseCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency} name={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-row">
          <div className="padding-h align-items-c">Exchange to:</div>

          <select className="padding-5" onChange={handleTargetCurrencyChange}>
            {currencies.map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              );
            })}
          </select>
        </div>

        <button className="margin-l" onClick={handleExchange} type="button">
          Calculate
        </button>
      </div>
      <hr />

      <div className="padding-h">
        <b>{exchangedAmount}</b>
      </div>
      <>
        {history.map((item, index) => {
          const { baseAmount, targetAmount, timestamp } = JSON.parse(item);
          const date = new Date(timestamp);
          const dateStr = date.toDateString();
          const timeStr = date.toLocaleTimeString([], {
            timeZoneName: 'short',
          });

          return (
            <div className="padding-h" key={index}>
              {baseAmount} =&gt; {targetAmount} | {dateStr} | {timeStr}
            </div>
          );
        })}
      </>
    </>
  );
}

export default App;
