import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState();
  const [exchangedAmount, setExchangedAmount] = useState();

  const [baseCurrency, setBaseCurrency] = useState();
  const [currencies, setCurrencies] = useState([]);
  const [targetCurrency, setTargetCurrency] = useState("");
  const [targetRate, setTargetRate] = useState();

  useEffect(() => {
    fetch("/currencies")
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

  const handleExchange = () => {
    if (!amount) return;

    const value = targetRate * amount;
    const formatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: targetCurrency,
    });

    const formattedValue = formatter.format(value);
    setExchangedAmount(formattedValue);
  };

  return (
    <>
      <div style={styles.flex}>
        <div style={styles.flex}>
          <div>Amount:</div>
          <input onChange={handleInputChange} type="number" />
          <select onChange={handleBaseCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency} name={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.flex}>
          <div>Exchange to:</div>
          <select onChange={handleTargetCurrencyChange}>
            {currencies.map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={handleExchange} type="button">
          Calculate
        </button>
      </div>
      <div>{exchangedAmount}</div>
    </>
  );
}

const styles = {
  flex: {
    display: "flex",
  },
};

export default App;
