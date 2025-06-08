import React, { useRef, useState } from "react";
import {
  AuthContainer,
  AuthFooter,
  AuthWrapper,
  ErrorMessageWrapper,
  FormGroup,
  Link,
  PrimaryButtonWrapper,
  SuccessMessage,
} from "./element";

import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/queiris";

type LoginResponse = {
  login: {
    success: boolean;
    message: string;
    token?: string; // Make optional if not always returned
    user?: {
      id: string;
      name: string;
    };
  };
};

export const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const recaptcha = useRef<ReCAPTCHA>(null);

  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [login] = useMutation<LoginResponse>(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const { data } = await login({
        variables: { username, password },
      });

      if (data?.login.success) {
        // Store token if available
        if (data.login.token) {
          localStorage.setItem("token", data.login.token);
        }
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      } else {
        setError(data?.login.message || "Login failed");
      }
    } catch (err) {
      setError("Invalid credentials");
      console.error("Login error:", err);
    }
  };

  return (
    <AuthWrapper>
      <AuthContainer>
        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </FormGroup>
          {/* <ReCAPTCHA ref={recaptcha} sitekey={REACT_APP_SITE_KEY} /> */}
          <PrimaryButton>Login</PrimaryButton>
          {error && <ErrorMessage message={error} />}
        </form>
      </AuthContainer>
    </AuthWrapper>
  );
};

const PrimaryButton = ({
  children,
  type,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <PrimaryButtonWrapper type="submit" {...props}>
      {children}
    </PrimaryButtonWrapper>
  );
};

export const ErrorMessage = ({ message }: { message: string }) => {
  return <ErrorMessageWrapper>{message}</ErrorMessageWrapper>;
};
