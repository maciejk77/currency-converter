import { useEffect, useState } from 'react';
import { addConversionToHistory, formatCurrency } from '../utils';
import useCurrenciesData from '../hooks/useCurrenciesData';
import { Button, ConversionHistory, Input, Select, Text } from '../components';
import './styles.css';

function CurrencyConverter() {
  const { currencies } = useCurrenciesData();

  const [inputAmount, setInputAmount] = useState();
  const [convertedAmount, setConvertedAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [conversionRate, setConversionRate] = useState();
  const [conversionHistory, setConversionHistory] = useState([]);

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
  }, [conversionHistory]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputAmount(value);
  };

  const handleCurrencyChange = (e, setCurrency) => {
    const { value } = e.target;
    setCurrency(value);
    setConvertedAmount(null);
  };

  const handleHistoryFetch = async () => {
    const response = await fetch('/history');
    const data = await response.json();
    setConversionHistory(data);
  };

  const handleConvertCurrency = (e) => {
    e.preventDefault();
    if (!inputAmount || fromCurrency === toCurrency) return;

    const formattedFromAmount = formatCurrency(inputAmount, fromCurrency);
    const formattedToAmount = formatCurrency(
      conversionRate * inputAmount,
      toCurrency
    );

    setConvertedAmount(formattedToAmount);
    addConversionToHistory(formattedFromAmount, formattedToAmount);
  };

  return (
    <div className="container">
      <form className="top-container" onSubmit={handleConvertCurrency}>
        <div className="flex-row-spacer">
          <Text>Amount:</Text>
          <Input
            onChange={handleInputChange}
            min={0}
            type="number"
            value={inputAmount}
          />
        </div>
        <div className="flex-row-spacer">
          <Text>From:</Text>
          <Select
            data={currencies}
            onChange={(e) => handleCurrencyChange(e, setFromCurrency)}
            value={fromCurrency}
          />
        </div>

        <div className="flex-row-spacer">
          <Text>To:</Text>
          <Select
            data={currencies}
            onChange={(e) => handleCurrencyChange(e, setToCurrency)}
            value={toCurrency}
          />
        </div>

        <div className="flex-row-spacer">
          <Button type="submit">Calculate</Button>
        </div>
      </form>

      <div className="conversion-container">
        <Text>
          Conversion Result:{' '}
          {convertedAmount ? <b>{convertedAmount}</b> : 'n/a'}
        </Text>
      </div>

      <ConversionHistory data={conversionHistory} />
    </div>
  );
}

export default CurrencyConverter;
