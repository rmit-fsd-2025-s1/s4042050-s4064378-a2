import React, { useRef, useState } from "react";
import { User } from "../types/User";
import {
  AuthContainer,
  AuthFooter,
  AuthWrapper,
  FormGroup,
  Link,
  SuccessMessage,
} from "./element";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import ReCAPTCHA from "react-google-recaptcha";
import { validateRegex } from "../util/validateRegex";
import {
  CHECK_EMAIL_REGEX,
  DONT_HAVE_ACCOUNT,
  LOGIN,
  REGISTER_SUCCESS,
  TEACH_TEAM,
} from "./constant";
// import { userValidation } from "../util/userValidation";
import { ErrorMessage } from "../components/ActivityStatus/ErrorMessage";
import { userApi } from "../services/userApi";
import axios from "axios";

const REACT_APP_SITE_KEY = "6LfaTQErAAAAAM4oamNji2SSm2uVi3-gUk1ul29S";
const SITE_SECRET = "6LfaTQErAAAAACODMgjJzjm-jubUGIz8S13k9m2H";

/**
 * Handles user login and displays registration success messages.
 *
 * @param setCurrentUser - Updates the current user state after login
 * @param navigateTo - Function for page navigation
 * @param registrationSuccess - Flag indicating if registration was successful (optional)
 * @param setRegistrationSuccess - Function to reset registration success state (optional)
 */

export type LoginPageProps = {
  setCurrentUser: (user: User) => void;
  navigateTo: (page: any) => void;
  registrationSuccess?: boolean;
  setRegistrationSuccess?: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
};

export const LoginPage = ({
  setCurrentUser,
  navigateTo,
  registrationSuccess,
  setRegistrationSuccess,
}: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const recaptcha = useRef<ReCAPTCHA>(null);

  React.useEffect(() => {
    if (registrationSuccess && setRegistrationSuccess) {
      const timer = setTimeout(() => {
        setRegistrationSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, setRegistrationSuccess]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!validateRegex(email, CHECK_EMAIL_REGEX)) {
      setError("Enter a valid email address");
      return;
    }

    if (password === "") {
      setError("Enter the password");
      return;
    }

    // Check if recaptcha ref exists and get the value
    if (!recaptcha.current) {
      setError("CAPTCHA not loaded");
      return;
    }
    const captchaValue = recaptcha.current.getValue();

    if (!captchaValue) {
      setError("Please verify the reCAPTCHA!");
      return;
    }

    setError("");

    try {
      const response = await userApi.login(email, password);
      console.log(response);
      if (!response) {
        setError("Error in login");
        return;
      }
      setCurrentUser(response);
      navigateTo("candidate");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        // Handle Axios-specific errors (e.g., HTTP 4xx/5xx responses)
        setError(
          err.response?.data?.message || err.message || "Request failed"
        );
      } else if (err instanceof Error) {
        // Handle generic JavaScript errors (e.g., TypeError, SyntaxError)
        setError(err.message);
      } else {
        // Fallback for non-Error objects (e.g., thrown strings, null, etc.)
        setError(String(err));
      }
    }

    // const user = userValidation({ email, password });
    // if (user) {
    //   setCurrentUser(user);
    //   if (user.role === "lecturer") {
    //     navigateTo("lecturer");
    //   } else {
    //     navigateTo("candidate");
    //   }
    //   return;
    // }

    // setError("User Not Found");
  };

  return (
    <AuthWrapper>
      <AuthContainer>
        <h1>{TEACH_TEAM}</h1>
        <h2 data-testid="login">{LOGIN}</h2>

        {registrationSuccess && (
          <SuccessMessage>{REGISTER_SUCCESS}</SuccessMessage>
        )}

        <form onSubmit={handleLogin}>
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
          <ReCAPTCHA ref={recaptcha} sitekey={REACT_APP_SITE_KEY} />
          <PrimaryButton>Login</PrimaryButton>
          {error && <ErrorMessage message={error} />}

          <AuthFooter>
            {DONT_HAVE_ACCOUNT}{" "}
            <Link onClick={() => navigateTo("register")}>Register</Link>
          </AuthFooter>
        </form>
      </AuthContainer>
    </AuthWrapper>
  );
};
