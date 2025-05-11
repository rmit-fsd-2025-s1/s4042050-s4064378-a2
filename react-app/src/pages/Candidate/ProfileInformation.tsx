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
  // const [availability, setAvailability] = useState<"part-time" | "full-time">(
  //   profile.availability
  // );
  const [newSkill, setNewSkill] = useState<string>("");
  // const [skills, setSkills] = useState<string[]>(profile.skills);

  const [newCredential, setNewCredential] = useState({
    degree: "",
    institution: "",
    year: new Date().getFullYear(),
  });

  console.log(profile);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // handle adding new skills
  // const handleAddSkill = () => {
  //   if (newSkill.trim() === "") return;

  //   // check old skills includes the new one if not add
  //   if (!skills.includes(newSkill.trim())) {
  //     const updatedSkills = [...skills, newSkill.trim()];
  //     setSkills(updatedSkills);
  //     onUpdate({ skills: updatedSkills });
  //     setNewSkill("");

  //     setPopupMessage("Skill Added Successfully!");
  //   }
  //   // if skill exist inform with a pop up message
  //   setPopupMessage("Skill Already Exist!");
  //   setIsPopupOpen(true);
  // };

  // remove skills
  // const handleRemoveSkill = (skillToRemove: string) => {
  //   const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
  //   setSkills(updatedSkills);
  //   // onUpdate({ skills: updatedSkills });
  // };

  // change availability
  // const handleAvailabilityChange = (
  //   newAvailability: "part-time" | "full-time"
  // ) => {
  //   setAvailability(newAvailability);
  //   onUpdate({ availability: newAvailability });
  // };

  // const handleAddCredential = () => {
  //   // check for empty inputs
  //   if (
  //     newCredential.degree.trim() !== "" &&
  //     newCredential.institution.trim() !== ""
  //   ) {
  //     const year = parseInt(newCredential.year.toString(), 10);

  //     if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
  //       return; // Invalid year
  //     }

  //     // updated credentials with old values
  //     const updatedCredentials = [
  //       ...profile.credentials,
  //       {
  //         degree: newCredential.degree.trim(),
  //         institution: newCredential.institution.trim(),
  //         year,
  //       },
  //     ];

  //     onUpdate({ credentials: updatedCredentials });

  //     setPopupMessage("Credentials Added Successfully!");
  //     setIsPopupOpen(true);

  //     // Reset form
  //     setNewCredential({
  //       degree: "",
  //       institution: "",
  //       year: new Date().getFullYear(),
  //     });
  //   }
  // };

  return (
    <ProfileInformationWrapper>
      <h2>Profile Information</h2>

      <Section>
        <div>
          <label>Full Name: </label>
          {profile.user.firstName + " " + profile.user.lastName}
        </div>
        <div>
          <label>Email: </label>

          {profile.user.email}
        </div>
      </Section>

      {/* <Section>
        <h3>Applied Roles</h3>
      </Section> */}

      <Popup
        isOpen={isPopupOpen}
        message={popupMessage}
        setIsOpen={setIsPopupOpen}
      />
    </ProfileInformationWrapper>
  );
};

export default ProfileInformation;
