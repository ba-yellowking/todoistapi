import "./Button.css";

function Button({ title, callback, className = "" }) {
  return (
    <div className={`button ${className}`} onClick={callback}>
      {title}
    </div>
  );
}

export default Button;
