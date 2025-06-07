// SummaryCard.styles.ts
import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TutorCard = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: #fafafa;
`;

export const TutorName = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

export const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  height: 10px;
  margin-bottom: 0.5rem;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #007bff;
`;

export const ProgressText = styled.div`
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`;

export const CourseTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span<{ accepted: boolean }>`
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  font-size: 0.8rem;
  background-color: ${({ accepted }) => (accepted ? "#d1e7dd" : "#f8d7da")};
  color: ${({ accepted }) => (accepted ? "#0f5132" : "#842029")};
  border: ${({ accepted }) =>
    accepted ? "1px solid #badbcc" : "1px solid #f5c2c7"};
`;
