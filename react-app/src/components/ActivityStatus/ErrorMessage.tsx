import styled from "styled-components";

export const ErrorMessage = ({ message }: { message: string }) => {
  return <ErrorMessageWrapper>{message}</ErrorMessageWrapper>;
};
const ErrorMessageWrapper = styled.div`
  background-color: #ffdddd;
  color: #ff0000;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  margin-top: 10px;
`;
