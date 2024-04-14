const Input = ({ onChange, min, type, value }) => (
  <input onChange={onChange} min={min} type={type} defaultValue={value} />
);

export default Input;
