import { Tutor } from "../../types/Tutor";
import {
  TutoCard,
  Name,
  TutorDetails,
  Row,
  RowLabel,
  RowValue,
  CourseList,
} from "./styles/TutorCard";

interface Props {
  tutor: Tutor; // A single tutor object with applied roles
}

// Component to display a non-editable overview of a tutor and their accepted courses
const TutorOverviewCard: React.FC<Props> = ({ tutor }) => {
  // Filter only accepted roles for displaying courses
  const acceptedCourses = tutor.appliedRoles?.filter(
    (r) => r.status === "accepted"
  ) ?? [];

  return (
    <TutoCard>
      {/* Tutor name displayed prominently */}
      <Name>
        {tutor.firstName} {tutor.lastName}
      </Name>

      {/* Tutor contact and profile details */}
      <TutorDetails>
        <Row>
          <RowLabel>Email:</RowLabel>
          <RowValue>{tutor.email}</RowValue>
        </Row>
        <Row>
          <RowLabel>Skills:</RowLabel>
          <RowValue>{tutor.skills.join(", ")}</RowValue>
        </Row>
        <Row>
          <RowLabel>Availability:</RowLabel>
          <RowValue>{tutor.availability}</RowValue>
        </Row>
      </TutorDetails>

      {/* List of accepted courses with rank */}
      <div style={{ marginTop: "0.9rem" }}>
        <RowLabel>Accepted Courses:</RowLabel>
        <CourseList>
          {acceptedCourses.length === 0 ? (
            // Show fallback if no courses accepted
            <li style={{ color: "#9ca4af" }}>None</li>
          ) : (
            // List accepted courses and ranks
            acceptedCourses.map((role, index) => (
              <li key={index}>
                {role.course.name} ({role.course.code}) — Rank:{" "}
                <span style={{ color: "#2563eb", fontWeight: 700 }}>
                  {role.rank}
                </span>
              </li>
            ))
          )}
        </CourseList>
      </div>
    </TutoCard>
  );
};

export default TutorOverviewCard;
