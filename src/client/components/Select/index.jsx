const Select = ({ data, value, onChange }) => (
  <select value={value} onChange={onChange}>
    {data.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);

export default Select;
