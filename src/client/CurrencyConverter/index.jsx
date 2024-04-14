import { useEffect, useState } from 'react';
import { formatCurrency } from '../utils';
import useCurrenciesData from '../hooks/useCurrenciesData';
import {
  Button,
  FlexRow,
  ConversionHistory,
  Input,
  Select,
  Text,
} from '../components';

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
    setConversionHistory(data);
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
      <FlexRow>
        <FlexRow>
          <Text>Amount:</Text>
          <Input
            onChange={handleInputChange}
            min={0}
            type="number"
            value={inputAmount}
          />
          <Select
            data={currencies}
            onChange={handleFromCurrencyChange}
            value={fromCurrency}
          />
        </FlexRow>

        <FlexRow>
          <Text>Convert to:</Text>
          <Select
            data={currencies}
            onChange={handleToCurrencyChange}
            value={toCurrency}
          />
        </FlexRow>

        <Button onClick={handleConvertCurrency}>Calculate</Button>
      </FlexRow>

      <Text>
        <b>{convertedAmount}</b>
      </Text>

      <ConversionHistory data={conversionHistory} />
    </>
  );
}

export default CurrencyConverter;
