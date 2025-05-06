import styled from "styled-components";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";

export const FormGroupWrapper = styled.div`
  margin-bottom: 20px;
  select,
  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    font-size: 16px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
  }
`;

export const ProfileInformationWrapper = styled.div`
  margin-bottom: 15px;
  color: var(--secondary-color);
`;

export const Section = styled.section`
  margin-bottom: 30px;

  h3 {
    margin-bottom: 15px;
    font-size: 18px;
    color: var(--secondary-color);
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 20px;

  & label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  & input {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
`;

export const SkillTag = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--light-color);
  padding: 5px 10px;
  border-radius: 20px;
`;

export const AddSkillWrapper = styled.div`
  display: flex;
  gap: 10px;

  & input {
    flex: 1;
  }
`;

export const CredentialList = styled.div`
  margin-bottom: 20px;
`;

export const CredentialItem = styled.div`
  padding: 15px;
  border: 1px solid #eee;
  border-radius: var(--border-radius);
  margin-bottom: 10px;
`;

export const AddCredentialWrapper = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
`;

export const RequiredIndicator = styled.span`
  color: red; // Usually red to draw attention
  margin-left: 4px;
`;

export const TutorApplicationHeading = styled.h2`
  margin-bottom: 15px;
  color: var(--secondary-color);
`;

export const PreviousRolesHeading = styled.h2`
  margin-bottom: 15px;
  color: var(--secondary-color);
`;

export const ProfileInformationHeading = styled.h2`
  margin-bottom: 15px;
  color: var(--secondary-color);
`;

export const TutorApplicationSubHeading = styled.p`
  margin-bottom: 20px;
  color: #666;
`;

// Add Skill Component
export const AddSkill = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Roles Table
export const RolesTable = styled.table`
  font-size: 16px;
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: var(--light-color);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 14px;

    th,
    td {
      padding: 8px;
    }
  }
`;

export const RemoveSkillsButton = styled.button`
  background: none;
  border: none;
  color: var(--danger-color);
  margin-left: 5px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CurrentSemesterCourses = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;

  & h3 {
    margin-bottom: 15px;
    font-size: 18px;
    color: var(--secondary-color);
  }
`;

export const SubmitButton = styled(PrimaryButton)`
  width: fit-content;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 16px;
  transition: var(--transition);

  &:hover {
    background-color: #2980b9;
  }
`;

export const CoursesList = styled.ul`
  list-style: none;

  li {
    padding: 10px;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const TutorDashboardWrapper = styled.div`
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

export const CourseFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  margin-bottom: 20px;
`;
