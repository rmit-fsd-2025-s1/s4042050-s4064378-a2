import React, { useState } from "react";
import {
  AuthContainer,
  AuthFooter,
  AuthWrapper,
  FormGroup,
  Link,
  StyledLabel,
  StyledSelect,
} from "./element"; // Styled layout components
import { PrimaryButton } from "../components/Buttons/PrimaryButton"; // Reusable primary button
import { HAVE_ACCOUNT, LOGIN, REGISTER, TEACH_TEAM } from "./constant"; // UI string constants
import { UserType } from "../types/User"; // Enum/type defining user roles
import { Page } from "../App"; // Page navigation types
import { ErrorMessage } from "../components/ActivityStatus/ErrorMessage"; // Component to show error messages
import { userApi } from "../services/userApi"; // User service for API calls
import PopupContainer from "../components/PopupContainer"; // Modal wrapper
import AvatarCustomizer from "../components/Avatar/AvatarCustomizer"; // Avatar customization tool
import {
  AvatarConfigProps,
  DEFAULT_AVATAR_CONFIG,
} from "../components/Avatar/avatarConfig"; // Avatar config type and default config

/**
 * Component responsible for rendering registration form
 * Handles form state, validation, and avatar selection
 * On successful registration, redirects to login page
 */
export const RegisterPage = ({
  navigateTo,
  setRegistrationSuccess,
}: {
  navigateTo: (page: Page) => void; // Called after successful registration
  setRegistrationSuccess: React.Dispatch<
    React.SetStateAction<boolean | undefined> // Used to flag registration success
  >;
}) => {
  // Form field states
  const [role, setRole] = useState<UserType>("candidate"); // Default role is candidate
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Holds any error messages

  // Avatar popup and config state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState(DEFAULT_AVATAR_CONFIG);

  // Form submit handler
  const handleRegister = async (e: any) => {
    e.preventDefault();

    // Basic required field validation
    if (!email || !password || !confirmPassword || !lastName) {
      setError("Please fill all fields");
      return;
    }

    // Password confirmation
    if (confirmPassword !== password) {
      setError("Passwords should be same");
      return;
    }

    // Strong password checks
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Add at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("Add at least one lowercase letter");
      return;
    } else if (!/\d/.test(password)) {
      setError("Add at least one number");
      return;
    } else {
      setError(""); // Clear error if validation passed
    }

    try {
      // Create user via API
      await userApi.createUser({
        password: password,
        email,
        lastName,
        firstName,
        role,
        avatarConfig, // Save avatar config along with user
      });
    } catch (error: any) {
      // Handle duplicate email errors or fallback
      if (
        error.response.data.error &&
        error.response.data.error.code === "ER_DUP_ENTRY"
      ) {
        setError("Email already exist");
      } else {
        setError("Error in creating user");
      }
      return;
    }

    // On success: clear error, show success, go to login
    setError("");
    setRegistrationSuccess(true);
    navigateTo("login");
  };

  return (
    <AuthWrapper>
      <AuthContainer>
        <h1>{TEACH_TEAM}</h1>
        <h2>{REGISTER}</h2>

        <form onSubmit={handleRegister}>
          {/* Email field */}
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          {/* First name field */}
          <FormGroup>
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </FormGroup>

          {/* Last name field */}
          <FormGroup>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </FormGroup>

          {/* Role selection (candidate or lecturer) */}
          <FormGroup>
            <StyledLabel htmlFor="role">Type</StyledLabel>
            <StyledSelect
              id="role"
              value={String(role)}
              onChange={(e) => setRole(e.target.value as unknown as UserType)}
              required
            >
              <option value="candidate">Candidate</option>
              <option value="lecturer">Lecturer</option>
            </StyledSelect>
          </FormGroup>

          {/* New password field */}
          <FormGroup>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              required
            />
          </FormGroup>

          {/* Confirm password field */}
          <FormGroup>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter the password"
              required
            />
          </FormGroup>

          {/* Avatar selection popup trigger */}
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsPopupOpen(true);
              }}
            >
              Select Avatar
            </button>

            {/* Avatar customization popup */}
            <PopupContainer
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              width="500px"
              height="fit-content"
            >
              <AvatarCustomizer
                onSave={function (config: AvatarConfigProps): void {
                  setAvatarConfig(config);
                  setIsPopupOpen(false);
                }}
                initialConfig={avatarConfig}
              />
            </PopupContainer>
          </div>

          {/* Submit button */}
          <PrimaryButton type="submit">Register</PrimaryButton>

          {/* Error feedback */}
          {error && <ErrorMessage message={error} />}

          {/* Login link */}
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
