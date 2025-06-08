import React, { FormEvent, useState } from "react";
import { Candidate } from "../../types/Candidate";
import { ProfileInformationWrapper, Section } from "./element";
import { Popup } from "../../components/Popup";
import { EditButton } from "../../components/Buttons/EditButton";
import { ErrorMessage } from "../../components/ActivityStatus/ErrorMessage";
import PopupContainer from "../../components/PopupContainer";
import { FormGroup } from "../element";
import AvatarCustomizer from "../../components/Avatar/AvatarCustomizer";
import { AvatarConfigProps } from "../../components/Avatar/avatarConfig";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import {
  getCurrentUser,
  setCurrentUserToLocalStorage,
} from "../../util/localStorage";
import { userApi } from "../../services/userApi";
import { User } from "../../types/User";

/**
 * Props type definition for ProfileInformation component.
 */
interface ProfileInformationProps {
  currentUser: User;
  onUpdate: (updatedProfile: Partial<Candidate>) => void;
}

/**
 * ProfileInformation - A component for viewing and editing user profile.
 *
 * Displays user's name, email, join date, and allows editing these details
 * including avatar customization. Profile updates are saved through an API call.
 */
const ProfileInformation: React.FC<ProfileInformationProps> = ({
  currentUser,
  onUpdate,
}) => {
  // State to toggle edit mode
  const [isEditProfile, setIsEditProfile] = useState<Boolean>(false);

  // States for popup visibility and message
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Form field states initialized with current user data
  const [email, setEmail] = useState(currentUser.email);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [newPassword, setNewPassword] = useState("");

  // Error message state
  const [error, setError] = useState("");

  // Avatar config state initialized from localStorage
  const [avatarConfig, setAvatarConfig] = useState(
    getCurrentUser()!.avatarConfig
  );

  /**
   * Handler for switching to edit mode
   */
  const onEditProfile = () => {
    setIsEditProfile(true);
  };

  /**
   * Handles form submission to save or cancel profile changes
   * Performs validation and triggers update API call if saving
   */
  const handleEditProfile = async (event: any) => {
    event.preventDefault();
    const submitter = event.nativeEvent.submitter.name;

    if (submitter === "save" && currentUser) {
      // Validate required fields
      if (!email || !firstName || !lastName) {
        setError("Please fill all fields");
        return;
      }
      try {
        // API call to update user profile
        const result = await userApi.updateUser(currentUser.id, {
          firstName,
          lastName,
          email,
          password: newPassword,
          avatarConfig,
        });

        // Persist updated user and reload page
        setCurrentUserToLocalStorage(result);
        setIsEditProfile(false);
        window.location.reload();
      } catch (error) {
        setError(String(error));
      }
    } else if (submitter === "cancel") {
      setIsEditProfile(false);
    }
  };

  return (
    <ProfileInformationWrapper>
      {isEditProfile ? (
        // Edit mode view
        <div>
          <h2 style={{ textAlign: "center" }}>Edit Profile</h2>
          <form onSubmit={handleEditProfile}>
            {/* Email field */}
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormGroup>

            {/* First Name field */}
            <FormGroup>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
            </FormGroup>

            {/* Last Name field */}
            <FormGroup>
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
              />
            </FormGroup>

            {/* New Password field */}
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

            {/* Edit avatar button */}
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsPopupOpen(true);
                }}
              >
                Edit Avatar
              </button>

              {/* Avatar customization popup */}
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

            {/* Save and Cancel buttons */}
            <PrimaryButton type="submit" name="save">
              Save
            </PrimaryButton>
            <PrimaryButton type="submit" name="cancel">
              Cancel
            </PrimaryButton>

            {/* Display error message if any */}
            {error && <ErrorMessage message={error} />}
          </form>
        </div>
      ) : (
        // View-only mode
        <div>
          {/* Header with Edit button */}
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

          {/* Display user profile information */}
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

          {/* Popup for general messages (not avatar) */}
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
