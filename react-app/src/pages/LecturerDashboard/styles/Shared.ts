import styled from "styled-components";

export const Select = styled.select`
  width: 100%;
  max-width: 14rem;
  font-size: 0.9rem;
  border: 1.01px solidrgb(180, 184, 190);
  box-shadow: 0 1px 2px rgba(12, 11, 11, 0.03);
  border-radius: 0.6rem;
  background-color: white;
  padding: 0.6rem 0.8rem;


  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;

  }
 

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(25, 72, 147, 0.5);
    border-color:rgb(35, 97, 197);
   
  }

  
`;

export const Input = styled.input`
  width: 100%;
  font-size: 0.9rem;
  max-width: 20rem;
  padding: 0.6rem 0.8rem;
  border-radius: 0.6rem;
  box-shadow: 0 1px 2px rgba(20, 8, 8, 0.03);
  border: 1.2px solid #d1d5db;


  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(47, 116, 227, 0.5);
    border-color:rgb(64, 115, 196);
   
  }
`;

