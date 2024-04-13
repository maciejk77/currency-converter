import { useState, useEffect } from 'react';

export default function useCurrencies() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/currencies');
        const data = await response.json();
        setCurrencies(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return {
    currencies,
    loading,
    error,
  };
}
