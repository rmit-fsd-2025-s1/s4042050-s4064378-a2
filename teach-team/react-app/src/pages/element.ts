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
