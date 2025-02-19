import "./InputUI.css";

function InputUI({
  onChange,
  placeholder,
  value,
  clickHandler,
  className = "",
}) {
  return (
    <input
      className={`input-ui ${className}`}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      onClick={clickHandler}
    />
  );
}

export default InputUI;
