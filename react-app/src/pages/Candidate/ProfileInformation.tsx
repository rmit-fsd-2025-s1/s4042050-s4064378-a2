import React, { FormEvent, useState } from "react";
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
import { EditButton } from "../../components/Buttons/EditButton";
import { ProfileEditPopup } from "./ProfileEditPopup";
import { ErrorMessage } from "../../components/ActivityStatus/ErrorMessage";
import PopupContainer from "../../components/PopupContainer";
import { FormGroup, StyledLabel, StyledSelect } from "../element";
import AvatarCustomizer from "../../components/Avatar/AvatarCustomizer";
import {
  AvatarConfigProps,
  DEFAULT_AVATAR_CONFIG,
} from "../../components/Avatar/avatarConfig";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import {
  getCurrentUser,
  setCurrentUserToLocalStorage,
} from "../../util/localStorage";
import { userApi } from "../../services/userApi";
import { User } from "../../types/User";

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
  currentUser: User;
  onUpdate: (updatedProfile: Partial<Candidate>) => void;
}

const ProfileInformation: React.FC<ProfileInformationProps> = ({
  currentUser,
  onUpdate,
}) => {
  // candidate availability
  // const [availability, setAvailability] = useState<"part-time" | "full-time">(
  //   profile.availability
  // );
  const [newSkill, setNewSkill] = useState<string>("");
  // const [skills, setSkills] = useState<string[]>(profile.skills);

  const [isEditProfile, setIsEditProfile] = useState<Boolean>(false);

  // const currentUser = getCurrentUser();

  const [newCredential, setNewCredential] = useState({
    degree: "",
    institution: "",
    year: new Date().getFullYear(),
  });

  // console.log(profile);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [email, setEmail] = useState(currentUser.email);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [newPassword, setNewPassword] = useState("");
  // const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState(
    getCurrentUser()!.avatarConfig
  );

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

  const onEditProfile = () => {
    setIsEditProfile(true);
  };

  const handleEditProfile = async (event: any) => {
    event.preventDefault();
    const submitter = event.nativeEvent.submitter.name;
    if (submitter === "save" && currentUser) {
      try {
        const result = await userApi.updateUser(currentUser.id, {
          firstName,
          lastName,
          email,
          // password: newPassword,
          avatarConfig,
        });

        setCurrentUserToLocalStorage(result);
        setIsEditProfile(false);
        window.location.reload();
      } catch (error) {
        // setError(error);
        console.log(error);
      }
    } else if (submitter === "cancel") {
      setIsEditProfile(false);
    }
  };

  return (
    <ProfileInformationWrapper>
      {isEditProfile ? (
        <div>
          <h2 style={{ textAlign: "center" }}>Edit Profile</h2>
          <form onSubmit={handleEditProfile}>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
              />
            </FormGroup>

            {/* <FormGroup>
              <label htmlFor="password">Old Password</label>
              <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter the old password to change the existing password"
              />
            </FormGroup> */}
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsPopupOpen(true);
                }}
              >
                Edit Avatar
              </button>

              <PopupContainer
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                width="500px"
                height="fit-content"
              >
                <AvatarCustomizer
                  onSave={function (config: AvatarConfigProps): void {
                    setAvatarConfig(config);
                    setIsPopupOpen(false);
                  }}
                  initialConfig={avatarConfig}
                />
              </PopupContainer>
            </div>

            <PrimaryButton type="submit" name="save">
              Save
            </PrimaryButton>
            <PrimaryButton type="submit" name="cancel">
              Cancel
            </PrimaryButton>

            {error && <ErrorMessage message={error} />}
          </form>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Profile Information</h2>
            <EditButton onClick={onEditProfile} />
          </div>

          <Section>
            <div>
              <label>Full Name: </label>
              {currentUser.firstName + " " + currentUser.lastName}
            </div>
            <div>
              <label>Email: </label>
              {currentUser.email}
            </div>
            <div>
              <label>Joined Date: </label>
              {String(currentUser.createdAt).split("T")[0]}
            </div>
          </Section>
          <Popup
            isOpen={isPopupOpen}
            message={popupMessage}
            setIsOpen={setIsPopupOpen}
          />
        </div>
      )}
    </ProfileInformationWrapper>
  );
};

export default ProfileInformation;
