import React from "react";
import AuthForm from "../components/AuthForm";
function Register({ setUser }) {
  return (
    <AuthForm
      type="register"
      setUser={setUser}
    />
  );
}

export default Register;