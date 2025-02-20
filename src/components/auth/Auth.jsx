import "./Auth.css";
import Button from "../../ui/button/Button.jsx";

function Auth({ authorize }) {
  return (
    <>
      <p className="auth-welcome">Welcome to a simple to-do list!</p>
      <Button
        className="login-button-style"
        title="Login"
        callback={authorize}
      ></Button>
    </>
  );
}

export default Auth;
