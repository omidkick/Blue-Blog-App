function Select({ value, onChange, options, id, name }) {
  return (
    <select
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      className="textField__input py-2.5 text-xs bg-secondary-0"
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
export default Select;
