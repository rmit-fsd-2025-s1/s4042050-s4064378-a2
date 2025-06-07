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
  tutor: TutorApplication;
  onUpdate: (update: { id: number; updatedRole: TutorRole }) => void;
  allTutors: TutorApplication[];
}

const TutorCard: React.FC<Props> = ({ tutor, onUpdate, allTutors }) => {
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

  const handleSave = () => {
    setErrorMessage("");
    setSuccessStatus(false);

    if (tutorStatus === "accepted" && (isNaN(tutorRank) || tutorRank <= 0)) {
      setErrorMessage("Please enter a valid rank greater than 0.");
      return;
    }

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
        settutorStatus(prevTutuorStatus);
        setErrorMessage(
          `Rank ${tutorRank} is already assigned to another applicant for this course.`
        );
        return;
      }
    }

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
      },
    };

    onUpdate(updated);
    setSuccessStatus(true);
    setprevTutuorStatus(tutorStatus);
    setTimeout(() => setSuccessStatus(false), 3000);
  };

  return (
    <TutoCard>
      <Name>
        {tutor.firstName} {tutor.lastName}
      </Name>
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
          <RowValue>{tutor.appliedRole.skills.join(", ")}</RowValue>
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
      </TutorDetails>

      <Form>
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
              if (updated !== "accepted") settutorRank(0);
            }}
          />
        </FormGroup>

        <FormGroup>
          <RowLabel>Add The Tutor Rank:</RowLabel>
          <StyledInput
            type="number"
            min={1}
            value={tutorRank === 0 ? "" : tutorRank.toString().replace(/^0+/, "")}
            disabled={tutorStatus !== "accepted"}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              settutorRank(isNaN(val) ? 0 : val);
            }}
          />
        </FormGroup>

        <FormGroup>
          <RowLabel>Add Comment:</RowLabel>
          <Textarea
            value={tuttorComment}
            onChange={(e) => setTuttorComment(e.target.value)}
            rows={3}
            placeholder="Please add the applicant comments..."
          />
        </FormGroup>

        {errorMessage && (
          <>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <ErrorMessage>Tutor not saved.</ErrorMessage>
          </>
        )}

        {successStatus && (
          <SuccessMessage>Successfully saved the tutor!</SuccessMessage>
        )}

        <Button onClick={handleSave}>Save</Button>
      </Form>
    </TutoCard>
  );
};

export default TutorCard;
