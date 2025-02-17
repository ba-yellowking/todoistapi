function Input({ onChange, placeholder, value, clickHandler }) {
  return (
    <div className="input">
      <input
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        onClick={clickHandler}
      />
    </div>
  )
}

export default Input