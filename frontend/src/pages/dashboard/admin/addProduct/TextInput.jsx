const TextInput = ({ label, name, value, onChange, type = 'text', placeholder }) => {

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        id={name}
        className="add-product-InputCSS"
      />
    </div>
  );
};

export default TextInput;
