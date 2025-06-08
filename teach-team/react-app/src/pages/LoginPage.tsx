import React, { useRef, useState } from "react";
import { User } from "../types/User"; // Type for the authenticated user object
import {
  AuthContainer,
  AuthFooter,
  AuthWrapper,
  FormGroup,
  Link,
  SuccessMessage,
} from "./element"; // Styled UI components
import { PrimaryButton } from "../components/Buttons/PrimaryButton"; // Reusable button
import ReCAPTCHA from "react-google-recaptcha"; // Google reCAPTCHA component for bot protection
import { validateRegex } from "../util/validateRegex"; // Utility function to validate inputs
import {
  CHECK_EMAIL_REGEX,
  DONT_HAVE_ACCOUNT,
  LOGIN,
  REGISTER_SUCCESS,
  TEACH_TEAM,
} from "./constant"; // UI constant strings
// import { userValidation } from "../util/userValidation"; // (Unused import for custom validation logic)
import { ErrorMessage } from "../components/ActivityStatus/ErrorMessage"; // Error display component
import { userApi } from "../services/userApi"; // API client for user login
import axios from "axios"; // Axios for API request and error handling
import { Popup } from "../components/Popup"; // (Unused import – possibly for modal usage)
import { TeachTeamLanding } from "./LandingPage"; // (Unused import – maybe for future redirection)

const REACT_APP_SITE_KEY = "6LfaTQErAAAAAM4oamNji2SSm2uVi3-gUk1ul29S"; // reCAPTCHA public key
const SITE_SECRET = "6LfaTQErAAAAACODMgjJzjm-jubUGIz8S13k9m2H"; // reCAPTCHA secret (normally shouldn't be in frontend)

// Props expected by LoginPage
export type LoginPageProps = {
  setCurrentUser: (user: User) => void; // Sets the authenticated user in state
  navigateTo: (page: any) => void; // Navigates to another page/component
  registrationSuccess?: boolean; // Optional flag for showing success message after registration
  setIsSuccessLogin: React.Dispatch<React.SetStateAction<boolean>>; // Callback for login success
  setRegistrationSuccess?: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >; // Callback to reset registration flag
};

export const LoginPage = ({
  setCurrentUser,
  navigateTo,
  registrationSuccess,
  setIsSuccessLogin,
  setRegistrationSuccess,
}: LoginPageProps) => {
  // Local state for form inputs and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const recaptcha = useRef<ReCAPTCHA>(null); // Ref to access reCAPTCHA value

  // Effect to auto-clear registration success message after 3 seconds
  React.useEffect(() => {
    if (registrationSuccess && setRegistrationSuccess) {
      const timer = setTimeout(() => {
        setRegistrationSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, setRegistrationSuccess]);

  // Main login handler
  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Validate email format
    if (!validateRegex(email, CHECK_EMAIL_REGEX)) {
      setError("Enter a valid email address");
      return;
    }

    // Check if password is provided
    if (password === "") {
      setError("Enter the password");
      return;
    }

    // Ensure reCAPTCHA is loaded and value is present
    if (!recaptcha.current) {
      setError("CAPTCHA not loaded");
      return;
    }
    const captchaValue = recaptcha.current.getValue();

    if (!captchaValue) {
      setError("Please verify the reCAPTCHA!");
      return;
    }

    setError(""); // Clear any previous error

    try {
      // Call login API
      const user = await userApi.login(email, password);
      if (!user) {
        setError("Error in login");
        return;
      }

      // Update login status and set user in app state
      setIsSuccessLogin(true);
      setCurrentUser(user);

      // Navigate based on user role
      if (user.role === "lecturer") {
        navigateTo("lecturer");
      } else if (user.role === "candidate") {
        navigateTo("candidate");
      }
    } catch (err: any) {
      // Detailed error handling
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || err.message || "Request failed"
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  return (
    <AuthWrapper>
      <AuthContainer>
        <h1>{TEACH_TEAM}</h1>
        <h2 data-testid="login">{LOGIN}</h2>

        {/* Show success message after registration */}
        {registrationSuccess && (
          <SuccessMessage>{REGISTER_SUCCESS}</SuccessMessage>
        )}

        <form onSubmit={handleLogin}>
          {/* Email input */}
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormGroup>

          {/* Password input */}
          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormGroup>

          {/* reCAPTCHA verification */}
          <ReCAPTCHA ref={recaptcha} sitekey={REACT_APP_SITE_KEY} />

          {/* Login submit button */}
          <PrimaryButton>Login</PrimaryButton>

          {/* Error message display */}
          {error && <ErrorMessage message={error} />}

          {/* Link to registration page */}
          <AuthFooter>
            {DONT_HAVE_ACCOUNT}{" "}
            <Link onClick={() => navigateTo("register")}>Register</Link>
          </AuthFooter>
        </form>
      </AuthContainer>
    </AuthWrapper>
  );
};
