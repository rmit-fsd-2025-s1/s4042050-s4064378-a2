import React, { useState } from "react";
import { TutorApplication, TutorRole } from "../../types/Tutor";
import {
  TutoCard,
  Name,
  Button,
  ErrorMessage,
  Form,
  FormGroup,
  StyledInput,
  Textarea,
  SuccessMessage,
  TutorDetails,
  RowLabel,
  Row,
  RowValue,
} from "./styles/TutorCard";
import Dropdown from "../../components/DropDown";

interface Props {
  tutor: TutorApplication; // Individual tutor application
  onUpdate: (update: { id: number; updatedRole: TutorRole }) => void; // Handler for saving updates
  allTutors: TutorApplication[]; // Full list to check for duplicate rank
}

const TutorCard: React.FC<Props> = ({ tutor, onUpdate, allTutors }) => {
  // Local state for form fields and UI feedback
  const [tutorStatus, settutorStatus] = useState<"rejected" | "accepted" | "pending">(
    tutor.appliedRole.status
  );
  const [tutorRank, settutorRank] = useState<number>(tutor.appliedRole.rank);
  const [tuttorComment, setTuttorComment] = useState<string>(
    tutor.appliedRole.comment || ""
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successStatus, setSuccessStatus] = useState<boolean>(false);
  const [prevTutuorStatus, setprevTutuorStatus] = useState<
    "rejected" | "accepted" | "pending"
  >(tutor.appliedRole.status);

  // Handle save button click
  const handleSave = () => {
    setErrorMessage("");
    setSuccessStatus(false);

    // Validation: rank must be a positive number when accepted
    if (tutorStatus === "accepted" && (isNaN(tutorRank) || tutorRank <= 0)) {
      setErrorMessage("Please enter a valid rank greater than 0.");
      return;
    }

    // Check for duplicate rank within same course and role
    if (tutorStatus === "accepted" && tutorRank > 0) {
      const duplicateRank = allTutors.find(
        (t) =>
          t.id !== tutor.id &&
          t.appliedRole.status === "accepted" &&
          t.appliedRole.rank === tutorRank &&
          t.appliedRole.course.id === tutor.appliedRole.course.id &&
          t.appliedRole.role === tutor.appliedRole.role
      );

      if (duplicateRank) {
        settutorStatus(prevTutuorStatus); // revert status
        setErrorMessage(
          `Rank ${tutorRank} is already assigned to another applicant for this course.`
        );
        return;
      }
    }

    // Construct update object to pass to parent
    const updated = {
      id: tutor.appliedRole.id,
      updatedRole: {
        id: tutor.appliedRole.id,
        role: tutor.appliedRole.role,
        course: tutor.appliedRole.course,
        comment: tuttorComment.trim(),
        rank: tutorStatus === "accepted" ? tutorRank : 0,
        status: tutorStatus,
        availability: tutor.appliedRole.availability,
        skills: tutor.appliedRole.skills,
        credentials: tutor.appliedRole.credentials,
        previousRoles: tutor.appliedRole.previousRoles,
      },
    };

    // Trigger update handler
    onUpdate(updated);
    setSuccessStatus(true);
    setprevTutuorStatus(tutorStatus);

    // Automatically clear success message after 3 seconds
    setTimeout(() => setSuccessStatus(false), 3000);
  };

  return (
    <TutoCard>
      {/* Tutor basic name header */}
      <Name>
        {tutor.firstName} {tutor.lastName}
      </Name>

      {/* Tutor details section */}
      <TutorDetails>
        <Row>
          <RowLabel>Email:</RowLabel>
          <RowValue>{tutor.email}</RowValue>
        </Row>
        <Row>
          <RowLabel>Availability:</RowLabel>
          <RowValue>{tutor.appliedRole.availability}</RowValue>
        </Row>
        <Row>
          <RowLabel>Skills:</RowLabel>
          <RowValue>{tutor.appliedRole.skills.join(", ") || "—"}</RowValue>
        </Row>
        <Row>
          <RowLabel>Applied Course:</RowLabel>
          <RowValue>
            {tutor.appliedRole.course.name} ({tutor.appliedRole.course.code})
          </RowValue>
        </Row>
        <Row>
          <RowLabel>Applied Role:</RowLabel>
          <RowValue>{tutor.appliedRole.role}</RowValue>
        </Row>

        {/* ✅ NEW: Credentials */}
        <Row>
          <RowLabel>Credentials:</RowLabel>
          <RowValue>
            {tutor.appliedRole.credentials?.length > 0 ? (
              <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                {tutor.appliedRole.credentials.map((cred, idx) => (
                  <li key={idx}>
                    {cred.degree} - {cred.institution} ({cred.year})
                  </li>
                ))}
              </ul>
            ) : (
              "—"
            )}
          </RowValue>
        </Row>

        {/* ✅ NEW: Previous Roles */}
        <Row>
          <RowLabel>Previous Roles:</RowLabel>
          <RowValue>
            {tutor.appliedRole.previousRoles?.length > 0 ? (
              <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                {tutor.appliedRole.previousRoles.map((prev, idx) => (
                  <li key={idx}>
                    {prev.role} - {prev.course}
                  </li>
                ))}
              </ul>
            ) : (
              "—"
            )}
          </RowValue>
        </Row>
      </TutorDetails>

      {/* Form for status, rank, and comment */}
      <Form>
        {/* Status Dropdown */}
        <FormGroup>
          <RowLabel>Select Application Status:</RowLabel>
          <Dropdown
            value={tutorStatus}
            options={[
              { value: "pending", label: "Pending" },
              { value: "accepted", label: "Accepted" },
              { value: "rejected", label: "Rejected" },
            ]}
            onChange={(value) => {
              const updated = value as "rejected" | "accepted" | "pending";
              settutorStatus(updated);

              // Clear rank if status isn't accepted
              if (updated !== "accepted") settutorRank(0);
            }}
          />
        </FormGroup>

        {/* Rank Input */}
        <FormGroup>
          <RowLabel>Add The Tutor Rank:</RowLabel>
          <StyledInput
            type="number"
            min={1}
            value={tutorRank === 0 ? "" : tutorRank.toString().replace(/^0+/, "")}
            disabled={tutorStatus !== "accepted"} // Enable only for accepted status
            onChange={(e) => {
              const val = parseInt(e.target.value);
              settutorRank(isNaN(val) ? 0 : val);
            }}
          />
        </FormGroup>

        {/* Comment Input */}
        <FormGroup>
          <RowLabel>Add Comment:</RowLabel>
          <Textarea
            value={tuttorComment}
            onChange={(e) => setTuttorComment(e.target.value)}
            rows={3}
            placeholder="Please add the applicant comments..."
          />
        </FormGroup>

        {/* Error Message Display */}
        {errorMessage && (
          <>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <ErrorMessage>Tutor not saved.</ErrorMessage>
          </>
        )}

        {/* Success Message */}
        {successStatus && (
          <SuccessMessage>Successfully saved the tutor!</SuccessMessage>
        )}

        {/* Save Button */}
        <Button onClick={handleSave}>Save</Button>
      </Form>
    </TutoCard>
  );
};

export default TutorCard;
