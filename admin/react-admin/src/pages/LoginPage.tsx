// Import React hooks and necessary dependencies
import React, { useRef, useState } from "react";
// Import styled components for layout
import {
  AuthContainer,
  AuthWrapper,
  ErrorMessageWrapper,
  FormGroup,
  PrimaryButtonWrapper,
} from "./element";
// Import routing and GraphQL dependencies
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/queiris";

// Define TypeScript type for login response
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

// Main LoginPage component
export const LoginPage = () => {
  // State for form inputs and error handling
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const recaptcha = useRef<ReCAPTCHA>(null); // Uncomment if using reCAPTCHA

  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  // Initialize login mutation
  const [login] = useMutation<LoginResponse>(LOGIN_MUTATION);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Execute login mutation with form data
      const { data } = await login({
        variables: { username, password },
      });

      // Handle successful login
      if (data?.login.success) {
        localStorage.setItem("isAuthenticated", "true"); // Set auth flag
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        // Display error message from server
        setError(data?.login.message || "Login failed");
      }
    } catch (err) {
      // Handle login errors
      setError("Invalid credentials");
      console.error("Login error:", err);
    }
  };

  // Render login form
  return (
    <AuthWrapper>
      <AuthContainer>
        <h1>Admin Login</h1>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
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

          {/* Password input field */}
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

          {/* Uncomment if using reCAPTCHA */}
          {/* <ReCAPTCHA ref={recaptcha} sitekey={REACT_APP_SITE_KEY} /> */}

          {/* Submit button */}
          <PrimaryButton>Login</PrimaryButton>

          {/* Display error message if exists */}
          {error && <ErrorMessage message={error} />}
        </form>
      </AuthContainer>
    </AuthWrapper>
  );
};

// Custom styled button component
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

// Error message display component
export const ErrorMessage = ({ message }: { message: string }) => {
  return <ErrorMessageWrapper>{message}</ErrorMessageWrapper>;
};
