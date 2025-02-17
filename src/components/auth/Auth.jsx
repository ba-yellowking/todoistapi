function Auth({ accessToken, authorize }) {
  return (
    <div className="auth">
      <p>Authorization</p>
      {accessToken ? (
        <>
          <p>You are authorized</p>
        </>
      ) : (
        <>
          <p>You are not authorized</p>
          <button onClick={authorize}>Login</button>
        </>
      )}
    </div>
  );
}

export default Auth;
