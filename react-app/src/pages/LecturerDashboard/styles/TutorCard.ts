import styled from "styled-components";

export const TutoCard = styled.div`
  border: 2px solid #e5e7eb;
  padding: 20px;
  border-radius: 10px;
  background: rgb(222, 228, 235); /* light gray-blue background */
  margin: 10px;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 3px 5px rgba(11, 2, 61, 0.06);
  width: 360px;

  &:hover {
    box-shadow: 0 5px 11px rgba(11, 2, 61, 0.06);
  }
`;

export const Name = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 2.5rem;
  color: rgb(9, 124, 239);
`;

export const Form = styled.div`
  margin-top: 1.5rem;
  flex-direction: column;
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  margin-top: 0.85rem;
  color: white;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  background-color: #2563eb;
  font-size: 0.985rem;
  border-radius: 0.4rem;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const OverviewCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const CourseList = styled.ul`
  margin-top: 0.5rem;
  padding-left: 1rem;
  font-size: 0.875rem;
  color: #374151;

  li {
    margin-bottom: 0.25rem;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StyledSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

export const StyledInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`;

export const Textarea = styled.textarea`
  padding: 0.5rem 0.75rem;
  resize: vertical;
  font-size: 0.875rem;
  border: 2px solid #d1d5db;
  border-radius: 1rem;
`;

export const ErrorMessage = styled.p`
  color: rgb(227, 4, 4);
  font-size: 1rem;
  margin-top: 1rem;
`;

export const SuccessMessage = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: rgb(5, 88, 86);
  margin-top: 0.25rem;
`;

export const TutorDetails = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  margin-bottom: 1.6rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
`;

export const RowLabel = styled.span`
  font-weight: 700;
  font-size: 1.1rem;
  color: rgb(17, 60, 154);
`;

export const RowValue = styled.span`
  word-break: break-word;
  font-weight: 700;
  color: rgb(4, 22, 49);
  font-size: 1.1rem;
`;
