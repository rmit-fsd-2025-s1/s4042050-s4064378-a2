import React from "react";
import {
  Wrapper,
  CardContainer,
  TutorCard,
  TutorName,
  ProgressBarContainer,
  ProgressBar,
  ProgressText,
  CourseTags,
  Tag,
  AvailabilityLabel,
} from "../styles/SummaryCard";

interface Props {
  title: string;
  tutors: {
    id: number;
    name: string;
    accepted: number;
    total: number;
    courses: {
      name: string;
      status: string;
      role: string;
      availability: "full-time" | "part-time" | string; // optional fallback type
    }[];
  }[];
}

const SummaryCard: React.FC<Props> = ({ title, tutors }) => {
  return (
    <Wrapper>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>{title}</h3>
      {tutors.length === 0 ? (
        <p>No tutors found.</p>
      ) : (
        <CardContainer>
          {tutors.map(({ id, name, accepted, total, courses }) => {
            const progress = Math.round((accepted / total) * 100);

            const fullTimeCourses = courses.filter(c => c.availability === "full-time");
            const partTimeCourses = courses.filter(c => c.availability === "part-time");

            return (
              <TutorCard key={id}>
                <TutorName>{name}</TutorName>

                <ProgressBarContainer>
                  <ProgressBar progress={progress} />
                </ProgressBarContainer>
                <ProgressText>
                  {accepted} accepted / {total} total ({progress}%)
                </ProgressText>

                {fullTimeCourses.length > 0 && (
                  <>
                    <AvailabilityLabel>Full-Time</AvailabilityLabel>
                    <CourseTags>
                      {fullTimeCourses.map(({ name, role, status }, i) => (
                        <Tag key={`ft-${i}`} accepted={status === "accepted"}>
                          {name} ({role}) {status === "accepted" ? "✓" : "✗"}
                        </Tag>
                      ))}
                    </CourseTags>
                  </>
                )}

                {partTimeCourses.length > 0 && (
                  <>
                    <AvailabilityLabel>Part-Time</AvailabilityLabel>
                    <CourseTags>
                      {partTimeCourses.map(({ name, role, status }, i) => (
                        <Tag key={`pt-${i}`} accepted={status === "accepted"}>
                          {name} ({role}) {status === "accepted" ? "✓" : "✗"}
                        </Tag>
                      ))}
                    </CourseTags>
                  </>
                )}
              </TutorCard>
            );
          })}
        </CardContainer>
      )}
    </Wrapper>
  );
};

export default SummaryCard;
