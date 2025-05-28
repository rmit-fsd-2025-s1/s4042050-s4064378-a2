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
  tutor: Tutor;
}

const TutorOverviewCard: React.FC<Props> = ({ tutor }) => {
  const acceptedCourses = tutor.appliedRoles?.filter(
    (r) => r.status === "accepted"
  ) ?? [];

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
          <RowLabel>Skills:</RowLabel>
          <RowValue>{tutor.skills.join(", ")}</RowValue>
        </Row>
        <Row>
          <RowLabel>Availability:</RowLabel>
          <RowValue>{tutor.availability}</RowValue>
        </Row>
      </TutorDetails>

      <div style={{ marginTop: "0.9rem" }}>
        <RowLabel>Accepted Courses:</RowLabel>
        <CourseList>
          {acceptedCourses.length === 0 ? (
            <li style={{ color: "#9ca4af" }}>None</li>
          ) : (
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
