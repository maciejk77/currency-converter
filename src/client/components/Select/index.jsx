import './styles.css';

const Select = ({ data, value, onChange }) => (
  <select className="select-root" onChange={onChange} value={value}>
    {data.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);

export default Select;
