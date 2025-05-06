import styled from "styled-components";

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

export const DropDownStyle = styled.select`
  font-size: 1rem;
  padding: 0.6rem 0.67rem;
  border-radius: 0.6rem;
  border: 1.02px solid #d1d5db;
  background: white;
  
   &:disabled {
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }

 
`;
