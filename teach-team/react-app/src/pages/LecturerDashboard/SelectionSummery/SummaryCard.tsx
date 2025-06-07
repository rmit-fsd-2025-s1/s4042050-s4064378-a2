import React from "react";
import { TutorApplication } from "../../../types/Tutor";

interface Props {
  title: string;
  tutors: TutorApplication[];
}

const SummaryCard: React.FC<Props> = ({ title, tutors }) => {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "1rem" }}>
      <h3>{title}</h3>
      {tutors.length === 0 ? (
        <p>No tutors found.</p>
      ) : (
        <ul>
          {tutors.map((tutor, index) => {
            const courseName = tutor.appliedRole?.course?.name ?? "No Course Assigned";
            return (
              <li key={index}>
                {tutor.firstName} {tutor.lastName} — {courseName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SummaryCard;
