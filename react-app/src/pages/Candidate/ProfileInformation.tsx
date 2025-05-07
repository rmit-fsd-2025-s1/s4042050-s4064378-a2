import React, { useState } from "react";
import { Candidate } from "../../types/Candidate";
import {
  AddCredentialWrapper,
  CredentialItem,
  CredentialList,
  FormGroupWrapper,
  ProfileInformationWrapper,
  RadioGroup,
  RemoveSkillsButton,
  Section,
  SkillList,
  SkillTag,
  SubmitButton,
} from "./element";
import { Popup } from "../../components/Popup";

/**
 * ProfileInformation - A component for displaying and editing candidate profile information.
 *
 * This component renders a candidate's profile details and provides functionality to update them.
 * It handles the display logic while delegating the actual update operations to the parent component.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Candidate} props.profile - The candidate profile object containing all profile information
 * @param {function} props.onUpdate - Callback function invoked when profile updates occur
 * @returns {React.ReactElement} The profile information form component
 *
 */

interface ProfileInformationProps {
  profile: Candidate;
  onUpdate: (updatedProfile: Partial<Candidate>) => void;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({
  profile,
  onUpdate,
}) => {
  // candidate availability
  const [availability, setAvailability] = useState<"part-time" | "full-time">(
    profile.availability
  );
  const [newSkill, setNewSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>(profile.skills);

  const [newCredential, setNewCredential] = useState({
    degree: "",
    institution: "",
    year: new Date().getFullYear(),
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // handle adding new skills
  const handleAddSkill = () => {
    if (newSkill.trim() === "") return;

    // check old skills includes the new one if not add
    if (!skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      onUpdate({ skills: updatedSkills });
      setNewSkill("");

      setPopupMessage("Skill Added Successfully!");
    }
    // if skill exist inform with a pop up message
    setPopupMessage("Skill Already Exist!");
    setIsPopupOpen(true);
  };

  // remove skills
  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    onUpdate({ skills: updatedSkills });
  };

  // change availability
  const handleAvailabilityChange = (
    newAvailability: "part-time" | "full-time"
  ) => {
    setAvailability(newAvailability);
    onUpdate({ availability: newAvailability });
  };

  const handleAddCredential = () => {
    // check for empty inputs
    if (
      newCredential.degree.trim() !== "" &&
      newCredential.institution.trim() !== ""
    ) {
      const year = parseInt(newCredential.year.toString(), 10);

      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        return; // Invalid year
      }

      // updated credentials with old values
      const updatedCredentials = [
        ...profile.credentials,
        {
          degree: newCredential.degree.trim(),
          institution: newCredential.institution.trim(),
          year,
        },
      ];

      onUpdate({ credentials: updatedCredentials });

      setPopupMessage("Credentials Added Successfully!");
      setIsPopupOpen(true);

      // Reset form
      setNewCredential({
        degree: "",
        institution: "",
        year: new Date().getFullYear(),
      });
    }
  };

  return (
    <ProfileInformationWrapper>
      <h2>Profile Information</h2>

      <Section>
        <div>
          <label>Full Name: </label>
          {profile.firstName + " " + profile.lastName}
        </div>
        <div>
          <label>Email: </label>

          {profile.email}
        </div>
      </Section>

      <Section>
        <h3>Availability</h3>
        {/** radio group for select candidate availability */}
        <RadioGroup>
          <label>
            <input
              type="radio"
              name="availability"
              value="part-time"
              checked={availability === "part-time"}
              onChange={() => handleAvailabilityChange("part-time")}
            />
            Part Time
          </label>
          <label>
            <input
              type="radio"
              name="availability"
              value="full-time"
              checked={availability === "full-time"}
              onChange={() => handleAvailabilityChange("full-time")}
            />
            Full Time
          </label>
        </RadioGroup>
      </Section>

      <Section>
        {/** skills list */}
        <h3>Skills</h3>
        <SkillList>
          {skills.map((skill) => (
            <SkillTag key={skill}>
              {skill}
              <RemoveSkillsButton
                type="button"
                onClick={() => handleRemoveSkill(skill)}
              >
                ×
              </RemoveSkillsButton>
            </SkillTag>
          ))}
        </SkillList>

        <FormGroupWrapper>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill"
          />
          <SubmitButton type="button" onClick={handleAddSkill}>
            Add
          </SubmitButton>
        </FormGroupWrapper>
      </Section>

      {/** academic credentials */}
      <Section>
        <h3>Academic Credentials</h3>
        <CredentialList>
          {profile.credentials.map((credential, index) => (
            <CredentialItem key={index}>
              <div>
                <strong>Degree:</strong> {credential.degree}
              </div>
              <div>
                <strong>Institution:</strong> {credential.institution}
              </div>
              <div>
                <strong>Year:</strong> {credential.year}
              </div>
            </CredentialItem>
          ))}
        </CredentialList>

        {/** add new academic credentials */}
        <AddCredentialWrapper>
          <h4>Add New Credential</h4>
          <FormGroupWrapper>
            <label htmlFor="degree">Degree:</label>
            <input
              type="text"
              id="degree"
              value={newCredential.degree}
              onChange={(e) =>
                setNewCredential({ ...newCredential, degree: e.target.value })
              }
              placeholder="E.g., BSc Computer Science"
            />
          </FormGroupWrapper>

          <FormGroupWrapper>
            <label htmlFor="institution">Institution:</label>
            <input
              type="text"
              id="institution"
              value={newCredential.institution}
              onChange={(e) =>
                setNewCredential({
                  ...newCredential,
                  institution: e.target.value,
                })
              }
              placeholder="E.g., University of Technology"
            />
          </FormGroupWrapper>

          <FormGroupWrapper>
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              value={newCredential.year}
              onChange={(e) =>
                setNewCredential({
                  ...newCredential,
                  year:
                    parseInt(e.target.value, 10) || new Date().getFullYear(),
                })
              }
              min="1900"
              max={new Date().getFullYear()}
            />
          </FormGroupWrapper>

          <SubmitButton type="button" onClick={handleAddCredential}>
            Add Credential
          </SubmitButton>
        </AddCredentialWrapper>
      </Section>
      <Popup
        isOpen={isPopupOpen}
        message={popupMessage}
        setIsOpen={setIsPopupOpen}
      />
    </ProfileInformationWrapper>
  );
};

export default ProfileInformation;
