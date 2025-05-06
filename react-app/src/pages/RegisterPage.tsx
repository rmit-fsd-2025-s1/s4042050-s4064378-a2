import React, { useState } from "react";
import {
  AuthContainer,
  AuthFooter,
  AuthWrapper,
  FormGroup,
  Link,
  StyledLabel,
  StyledSelect,
} from "./element";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import { HAVE_ACCOUNT, LOGIN, REGISTER, TEACH_TEAM } from "./constant";
import { addUser, isEmailExist } from "../util";
import { Role } from "../types/User";
import { Page } from "../App";
import { ErrorMessage } from "../components/ActivityStatus/ErrorMessage";

/**
 * Handles user registration and manages registration success state.
 *
 * @param navigateTo - Callback for navigating to other pages (e.g., login after successful registration)
 * @param setRegistrationSuccess - Updates the registration success state (used to show success messages)
 */

export const RegisterPage = ({
  navigateTo,
  setRegistrationSuccess,
}: {
  navigateTo: (page: Page) => void;
  setRegistrationSuccess: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}) => {
  const [role, setRole] = useState<Role>("tutor");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Check if email already exists
    const emailExists = isEmailExist(email);

    if (emailExists) {
      setError("The email already exists");
    } else if (confirmPassword !== password) {
      setError("Passwords should be same");
    } else {
      // In a real app, you would call an API to register the user
      addUser({ email, role, password, firstName, lastName });
      setRegistrationSuccess(true);
      navigateTo("login");
    }
  };

  return (
    <AuthWrapper>
      <AuthContainer>
        <h1>{TEACH_TEAM}</h1>
        <h2>{REGISTER}</h2>

        <form onSubmit={handleRegister}>
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
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={firstName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </FormGroup>
          <FormGroup>
            <StyledLabel htmlFor="role">Role</StyledLabel>
            <StyledSelect
              id="role"
              value={String(role)}
              onChange={(e) => setRole(e.target.value as unknown as Role)}
              required
            >
              <option value="tutor">Tutor</option>
              <option value="lecturer">Lecturer</option>
            </StyledSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter the password"
            />
          </FormGroup>

          <PrimaryButton type="submit">Register</PrimaryButton>
          {error && <ErrorMessage message={error} />}

          <AuthFooter>
            {HAVE_ACCOUNT}{" "}
            <Link className="link" onClick={() => navigateTo("login")}>
              {LOGIN}
            </Link>
          </AuthFooter>
        </form>
      </AuthContainer>
    </AuthWrapper>
  );
};
