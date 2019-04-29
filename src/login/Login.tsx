import React, { useContext, useCallback } from "react";
import { AuthContext } from "./AuthProvider";
import LoginForm from "./LoginForm";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const onSubmit = useCallback(
    (email: string, password: string) => {
      login(email);
    },
    [login]
  );

  return <LoginForm onSubmit={onSubmit} />;
};


export default Login;