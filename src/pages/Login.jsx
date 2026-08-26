import React from "react";
import AuthForm from "../components/AuthForm";
function Login({ setUser }) {
  return (
    <AuthForm
      type="login"
      setUser={setUser}
    />
  );
}

export default Login;