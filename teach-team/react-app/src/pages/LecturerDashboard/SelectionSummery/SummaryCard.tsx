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
} from "../styles/SummaryCard";

interface Props {
  title: string;
  tutors: {
    id: number;
    name: string;
    accepted: number;
    total: number;
    courses: { name: string; status: string }[];
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
            return (
              <TutorCard key={id}>
                <TutorName>{name}</TutorName>
                <ProgressBarContainer>
                  <ProgressBar progress={progress} />
                </ProgressBarContainer>
                <ProgressText>
                  {accepted} accepted / {total} total ({progress}%)
                </ProgressText>
                <CourseTags>
                  {courses.map(({ name, status }, i) => (
                    <Tag key={i} accepted={status === "accepted"}>
                      {name} {status === "accepted" ? "✓" : "✗"}
                    </Tag>
                  ))}
                </CourseTags>
              </TutorCard>
            );
          })}
        </CardContainer>
      )}
    </Wrapper>
  );
};

export default SummaryCard;
