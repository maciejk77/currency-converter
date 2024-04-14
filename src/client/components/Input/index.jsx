import './styles.css';

const Input = ({ onChange, min, type, value }) => (
  <input
    className="input-root"
    defaultValue={value}
    min={min}
    onChange={onChange}
    type={type}
  />
);

export default Input;
