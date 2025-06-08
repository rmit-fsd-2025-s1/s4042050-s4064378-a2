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
 * This component serves as a "container" in a container-presentational pattern.
 *
 * - It is responsible for all business logic related to transforming raw data into
 *   a summarized structure suitable for rendering.
 * - The actual visual display is fully delegated to the `SummaryCard` component,
 *   which is a stateless, purely presentational component.
 *
 * Benefits of this separation:
 * - Decouples data logic from UI, making code more modular and testable
 * - Encourages reuse of visual components for other summary types with minimal changes
 * - Enhances maintainability by isolating logic-heavy operations
 */

const SummaryCardContainer: React.FC<Props> = ({ title, tutors }) => {
  /**
   * Group tutors by full name and compute selection stats:
   * - accepted: number of accepted applications
   * - total: total number of applications
   * - courses: list of course-role-status info to display
   *
   * This transformation is done once here in the container to ensure
   * the visual component (SummaryCard) remains clean and focused only on rendering.
   */
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

    // Initialize grouping entry if not already present
    if (!acc[fullName]) {
      acc[fullName] = {
        id: t.id,
        accepted: status === "accepted" ? 1 : 0,
        total: 1,
        courses: [courseEntry],
      };
    } else {
      // Update aggregation for existing tutor
      acc[fullName].accepted += status === "accepted" ? 1 : 0;
      acc[fullName].total += 1;
      acc[fullName].courses.push(courseEntry);
    }

    return acc;
  }, {});

  // Convert object to array for visual rendering
  const processed = Object.entries(grouped).map(([name, data]) => ({
    name,
    ...data,
  }));

  // Render the visual component with processed tutor summary data
  return <SummaryCard title={title} tutors={processed} />;
};

export default SummaryCardContainer;
