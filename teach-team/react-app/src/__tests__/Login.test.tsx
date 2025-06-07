import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginPage, LoginPageProps } from "../pages/LoginPage";

import {
  DONT_HAVE_ACCOUNT,
  REGISTER_SUCCESS,
  TECH_TEAM,
} from "../pages/constant";

jest.mock("../util/userValidation", () => ({
  userValidation: jest.fn(),
}));

jest.mock("../util/validateRegex", () => ({
  validateRegex: jest.fn(),
}));

describe("Login Page", () => {
  const mockSetCurrentUser = jest.fn();
  const mockNavigateTo = jest.fn();
  const mockSetRegistrationSuccess = jest.fn();

  // mock user for testing
  const mockUser = {
    email: "test.user@example.com",
    firstName: "Test",
    lastName: "User",
    password: "securePassword123!",
    role: "lecturer",
  };

  // Login page render
  const renderUI = (props: LoginPageProps) => {
    render(<LoginPage {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (
      require("../util/validateRegex").validateRegex as jest.Mock
    ).mockReturnValue(true);
    (
      require("../util/userValidation").userValidation as jest.Mock
    ).mockReturnValue(mockUser);
  });

  test("should render login form correctly", () => {
    renderUI({
      setCurrentUser: mockSetCurrentUser,
      navigateTo: mockNavigateTo,
    });

    expect(screen.getByText(TECH_TEAM)).toBeInTheDocument();
    expect(screen.getByTestId("login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByText(DONT_HAVE_ACCOUNT)).toBeInTheDocument();
  });

  test("should show success message when registrationSuccess is true", () => {
    renderUI({
      setCurrentUser: mockSetCurrentUser,
      navigateTo: mockNavigateTo,
      registrationSuccess: true,
      setRegistrationSuccess: mockSetRegistrationSuccess,
    });

    expect(screen.getByText(REGISTER_SUCCESS)).toBeInTheDocument();
  });

  test("should success message disappears after 3 seconds", async () => {
    jest.useFakeTimers();
    renderUI({
      setCurrentUser: mockSetCurrentUser,
      navigateTo: mockNavigateTo,
      registrationSuccess: true,
      setRegistrationSuccess: mockSetRegistrationSuccess,
    });

    expect(screen.getByText(REGISTER_SUCCESS)).toBeInTheDocument();

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(mockSetRegistrationSuccess).toHaveBeenCalledWith(false);
    });

    jest.useRealTimers();
  });

  test("should shows error when invalid email", () => {
    (
      require("../util/validateRegex").validateRegex as jest.Mock
    ).mockReturnValue(false);

    renderUI({
      setCurrentUser: mockSetCurrentUser,
      navigateTo: mockNavigateTo,
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
  });

  test("should show error when password is empty", () => {
    renderUI({
      setCurrentUser: mockSetCurrentUser,
      navigateTo: mockNavigateTo,
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByText("Enter the password")).toBeInTheDocument();
  });

  test("should navigate to register page when register link is clicked", () => {
    renderUI({
      setCurrentUser: mockSetCurrentUser,
      navigateTo: mockNavigateTo,
    });

    fireEvent.click(screen.getByText("Register"));
    expect(mockNavigateTo).toHaveBeenCalledWith("register");
  });
});
