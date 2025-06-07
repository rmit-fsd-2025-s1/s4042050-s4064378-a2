import React from "react";
import { TutorApplication } from "../../../types/Tutor";

interface Props {
  title: string;
  tutors: TutorApplication[];
}

const SummaryCard: React.FC<Props> = ({ title, tutors }) => {
  // Group tutors by full name
  const grouped = tutors.reduce<
    Record<string, {
      id: number;
      accepted: number;
      total: number;
      courses: { name: string; status: string }[];
    }>
  >((acc, t) => {
    const fullName = `${t.firstName} ${t.lastName}`;
    const courseName = t.appliedRole?.course?.name ?? "No Course Assigned";
    const status = t.appliedRole?.status ?? "pending";

    if (!acc[fullName]) {
      acc[fullName] = {
        id: t.id,
        accepted: status === "accepted" ? 1 : 0,
        total: 1,
        courses: [{ name: courseName, status }],
      };
    } else {
      acc[fullName].accepted += status === "accepted" ? 1 : 0;
      acc[fullName].total += 1;
      acc[fullName].courses.push({ name: courseName, status });
    }

    return acc;
  }, {});

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "1rem" }}>
      <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>{title}</h3>
      {Object.keys(grouped).length === 0 ? (
        <p>No tutors found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {Object.entries(grouped).map(([name, { id, accepted, total, courses }]) => {
            const progress = Math.round((accepted / total) * 100);
            return (
              <div
                key={id}
                style={{
                  padding: "1rem",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  backgroundColor: "#fafafa",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "0.25rem" }}>{name}</div>

                {/* Progress Bar */}
                <div
                  style={{
                    backgroundColor: "#e0e0e0",
                    borderRadius: "6px",
                    overflow: "hidden",
                    height: "10px",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      backgroundColor: "#007bff",
                      height: "100%",
                    }}
                  />
                </div>
                <div style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                  {accepted} accepted / {total} total ({progress}%)
                </div>

                {/* Course Chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {courses.map(({ name, status }, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: status === "accepted" ? "#d1e7dd" : "#f8d7da",
                        color: status === "accepted" ? "#0f5132" : "#842029",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "5px",
                        fontSize: "0.8rem",
                        border: status === "accepted" ? "1px solid #badbcc" : "1px solid #f5c2c7",
                      }}
                    >
                      {name} {status === "accepted" ? "✓" : "✗"}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SummaryCard;