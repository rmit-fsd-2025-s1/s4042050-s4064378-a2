import styled from "styled-components";

export const AuthWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

export const AuthContainer = styled.div`
  width: 400px;
  padding: 20px;
  padding-top: 0px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  & h1 {
    text-align: center;
    margin-bottom: 10px;
  }

  & h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const SuccessMessage = styled.div`
  background-color: #ddffdd;
  color: #28a745;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

export const AuthFooter = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
  margin-right: 20px;

  & input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  & label {
    display: block;
    font-weight: 500;
  }
`;

export const Link = styled.span`
  color: rgb(0, 94, 255);
  text-decoration: none;
  cursor: pointer;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  appearance: none;
  background-color: white;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

export const PrimaryButtonWrapper = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: rgb(38, 3, 118);
  }
`;

export const ErrorMessageWrapper = styled.div`
  background-color: #ffdddd;
  color: #ff0000;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  margin-top: 10px;
`;

export const DashboardWrapper = styled.div`
  background-color: var(--secondary-color);
  color: white;
  padding: 20px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
  box-shadow: var(--box-shadow);

  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 24px;
  }
`;

export const DashboardRightSide = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoutButtonWrapper = styled.button`
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  height: 40px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const MainPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  nav {
    margin-bottom: 20px;

    ul {
      display: flex;
      list-style: none;
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      overflow: hidden;

      li {
        flex: 1;
      }
    }

    button {
      width: 100%;
      padding: 15px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      transition: var(--transition);
      color: var(--secondary-color);

      &:hover {
        background-color: var(--light-color);
      }

      &.active {
        background-color: var(--primary-color);
        color: white;
      }
    }
  }

  main {
    background-color: white;
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
  }
`;
