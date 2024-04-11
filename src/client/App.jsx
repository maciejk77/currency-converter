import { useEffect, useState } from "react";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState();
  const [targetCurrency, setTargetCurrency] = useState("");

  console.log("from: ", baseCurrency);
  console.log("to: ", targetCurrency);
  console.log("amount: ", amount);

  useEffect(() => {
    fetch("/currencies")
      .then((res) => res.json())
      .then((data) => setCurrencies(data));
  }, []);

  useEffect(() => {
    setBaseCurrency(currencies[0]);
    setTargetCurrency(currencies[0]);
  }, [currencies]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleBaseCurrencyChange = (e) => {
    const { value } = e.target;
    setBaseCurrency(value);
  };

  const handleTargetCurrencyChange = (e) => {
    const { value } = e.target;
    setTargetCurrency(value);
  };

  return (
    <div style={styles.flex}>
      <div style={styles.flex}>
        <div>Base:</div>
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
      <button type="button">Exchange here</button>
    </div>
  );
}

const styles = {
  flex: {
    display: "flex",
  },
};

export default App;
