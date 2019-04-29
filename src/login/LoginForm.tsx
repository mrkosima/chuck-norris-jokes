import React from "react";
import { Formik } from "formik";
import "./LoginForm.css";

import { emailPasswordSchema } from "./helper";

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}
export const LoginForm = ({ onSubmit }: LoginFormProps) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={values => {
      onSubmit(values.email, values.password);
    }}
    validationSchema={emailPasswordSchema}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && (
            <div className="error-description">{errors.email}</div>
          )}
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && (
            <div className="error-description">{errors.password}</div>
          )}
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
      );
    }}
  </Formik>
);

export default LoginForm;
