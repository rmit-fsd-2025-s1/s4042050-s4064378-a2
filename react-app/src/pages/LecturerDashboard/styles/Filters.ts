import styled from "styled-components";

export const Filter = styled.div`
  background: white;
  border-radius: 0.87rem;
  box-shadow: 0 1px 2px rgba(32, 5, 5, 0.05);
  padding: 1.1rem;
  margin-bottom: 1.6rem;
  

  display: flex;
  gap: 1.1rem;
  flex-direction: column;
  

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
  }
`;
