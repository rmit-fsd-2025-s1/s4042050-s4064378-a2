import styled from "styled-components";

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 2rem 3rem;
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const TutorOverviewGrid = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;

  &:only-child {
    justify-content: center;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const TutList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
  max-height: calc(100vh - 220px);

  /* Optional: Style scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Optional: Add smooth scroll */
  scroll-behavior: smooth;

  &::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.2);
    border-radius: 4px;
  }
`;
