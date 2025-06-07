import React from "react";
import { TutorApplication } from "../../../types/Tutor";
import SummaryCard from "./SummaryCard";

interface Props {
  title: string;
  tutors: TutorApplication[];
}

/**
 * SummaryCardContainer Component
 *
 * Architectural Note:
 * --------------------
 * This container component is responsible for processing raw tutor data
 * (e.g., grouping by tutor, computing accepted vs total roles) and passing
 * the formatted data to the `SummaryCard` presentational component.
 *
 * This follows the container-presentational pattern:
 * - Keeps business logic separate from UI rendering
 * - Improves testability, reusability, and clarity
 * - Supports future scaling and modification with minimal UI impact
 */

const SummaryCardContainer: React.FC<Props> = ({ title, tutors }) => {
  // Group tutors by full name
  const grouped = tutors.reduce<
    Record<
      string,
      {
        id: number;
        accepted: number;
        total: number;
        courses: { name: string; status: string; role: string; availability: string }[];
      }
    >
  >((acc, t) => {
    const fullName = `${t.firstName} ${t.lastName}`;
    const courseName = t.appliedRole?.course?.name ?? "No Course Assigned";
    const status = t.appliedRole?.status ?? "pending";
    const role = t.appliedRole?.role ?? "N/A";
    const availability = t.appliedRole?.availability ?? "unknown";

    const courseEntry = { name: courseName, status, role, availability };

    if (!acc[fullName]) {
      acc[fullName] = {
        id: t.id,
        accepted: status === "accepted" ? 1 : 0,
        total: 1,
        courses: [courseEntry],
      };
    } else {
      acc[fullName].accepted += status === "accepted" ? 1 : 0;
      acc[fullName].total += 1;
      acc[fullName].courses.push(courseEntry);
    }

    return acc;
  }, {});

  // Flatten into array for rendering
  const processed = Object.entries(grouped).map(([name, data]) => ({
    name,
    ...data,
  }));

  return <SummaryCard title={title} tutors={processed} />;
};

export default SummaryCardContainer;
