import React, { useState } from "react";
import { TutorApplication } from "../../types/Tutor"
import { TutorRole } from "../../types/Tutor";
import { getCourseDisplay } from "../../util/getCourseByID";
import {
  TutoCard, Name, Button, ErrorMessage, Form,
  FormGroup, StyledInput,
  Textarea, SuccessMessage, TutorDetails, RowLabel, Row, RowValue
} from "./styles/TutorCard";
import Dropdown from "../../components/DropDown"
import { loadTutors } from "../../util/localStorage";
import { flattenTutors } from "../../util/getTutor";


interface Props {
  tutor: TutorApplication;
  onUpdate: (update: { id: string; updatedRole: TutorRole }) => void;
  allTutors: TutorApplication[];
}

const TutorCard: React.FC<Props> = ({ tutor, onUpdate, allTutors }) => {

  const [tutorStatus, settutorStatus] = useState<"rejected" | "accepted" | "pending">(tutor.status);
  const [tutorRank, settutorRank] = useState<number>(tutor.rank);
  const [tuttorComment, setTuttorComment] = useState<string>(tutor.appliedRole.comment || "");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successStatus, setSuccessStatus] = useState<boolean>(false);
  const [prevTutuorStatus, setprevTutuorStatus] = useState<"rejected" | "accepted" | "pending">(tutor.status);

  //Save functionality
  const handleSave = () => {
    setErrorMessage("");
    setSuccessStatus(false);

   /// Validations////////////

    // When the tutor is updated the validation is checked
    // This validation checks if perticuler rank is assigned to a user before
    // who has been selected on the same subject. 
    // If the same rank is assigned to another user with same applied subject error message is shown
    // rank can be assigend only if the user status is accepted
    // Rank should be greater than 0

    
    //When seting user stutus valdations have been added only to select acepted statusses
    // Invalid status are not shown Lecture
    if (tutorStatus === "accepted" && (isNaN(tutorRank) || tutorRank <= 0)) {
      setErrorMessage("Please enter a valid rank greater than 0.");
      return;
    }
    
    if (tutorStatus === "accepted" && tutorRank > 0) {
      const tutors = loadTutors()
      const tutorsToFilter = flattenTutors(tutors)
      const duplicateRank = tutorsToFilter.find(
        (t) =>
          t.appliedRole.rank === tutorRank &&
          t.appliedRole.status === "accepted" &&
          t.appliedRole.courseId === tutor.course 
      );

      if (duplicateRank) {
        // If the duplicate rank is assigned error message is shown and tutor status roll backed
        settutorStatus(prevTutuorStatus);
        setErrorMessage(`Rank ${tutorRank} is already assigned to another applicant for this course.`);
        return;
      }
    }

    const updated = {
      id: tutor.id,
      updatedRole: {
        role: tutor.appliedRole.role,
        courseId: tutor.course,
        comment: tuttorComment.trim(),
        rank: tutorStatus === "accepted" ? tutorRank : 0,
        status: tutorStatus
      },
    };

    onUpdate(updated);
    setSuccessStatus(true);
    setprevTutuorStatus(tutorStatus);
    setTimeout(() => setSuccessStatus(false), 3000);
  };

  return (
    <TutoCard>
      <Name>{tutor.firstName} {tutor.lastName}</Name>
      <TutorDetails>
        <Row><RowLabel>Email:</RowLabel> <RowValue>{tutor.email}</RowValue></Row>
        <Row><RowLabel>Availability:</RowLabel> <RowValue>{tutor.availability}</RowValue></Row>
        <Row><RowLabel>Skills:</RowLabel> <RowValue>{tutor.skills.join(", ")}</RowValue></Row>
        <Row><RowLabel>Applied Course:</RowLabel> <RowValue>{getCourseDisplay(tutor.course)}</RowValue></Row>
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
              const UpdatedStatus = value as "rejected" | "accepted" | "pending";
              settutorStatus(UpdatedStatus);
              if (UpdatedStatus !== "accepted") settutorRank(0);
            }}
            
          />
        </FormGroup>


        <FormGroup>
        <RowLabel>Add The Tutor Rank :</RowLabel>
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
            placeholder="Please add the applicant comments.."
          />
        </FormGroup>

        {errorMessage && (
          <>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <ErrorMessage>Tutor not saved.</ErrorMessage>
          </>
        )}

        {successStatus && <SuccessMessage>Successfully saved the tutor!</SuccessMessage>}

        <Button onClick={handleSave}>Save</Button>
      </Form>
    </TutoCard>

  );
};

export default TutorCard;
