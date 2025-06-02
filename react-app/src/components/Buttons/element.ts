import styled from "styled-components";
import { BaseButton } from "./BaseButton";

export const PrimaryButtonWrapper = styled(BaseButton)`
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

export const LogoutButtonWrapper = styled(BaseButton)`
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
