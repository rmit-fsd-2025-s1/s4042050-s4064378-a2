import React, { useState, useEffect } from "react";
import { Tutor, TutorApplication } from "../../../types/Tutor";
import { SortOption } from "../../../types/sortTypes";
import SearchBar from "./SearchBar";
import SortByCourseOrAvailability from "./SortByCourseOrAvailability";
import CourseBasedFilter from "./CourseBasedFilter";
// import TutorFilter from "./TutorFilter"; // Currently not used
import { Filter } from "../styles/Filters";
import { useSelectionFilteredTutors } from "../../../hooks/useSelectionFilteredTutors";

// Define the component props
interface Props {
  onFilteredchangedList: (filtered: TutorApplication[]) => void; // Callback when filtered data updates
  TutorApplicants: Tutor[]; // Full list of tutor applicants
  onViewModeChange: (viewMode: string) => void; // Callback to inform the parent of view mode changes
}

const SearchSortBar: React.FC<Props> = ({
  TutorApplicants,
  onFilteredchangedList,
  onViewModeChange,
}) => {
  // State to control sorting
  const [sortByCourseAvailability, setsortByCourseAvailability] = useState<SortOption>("course");

  // State to control which filter group we're viewing (most, least, unselected, all)
  const [tutorSelectFilter, setTutorSelectFilter] = useState("all");

  // Search bar query
  const [userSearchQuery, setuserSearchQuery] = useState("");

  // Filter by course
  const [filterByCourse, setfilterByCourse] = useState("all");

  // Display search validation errors
  const [searchError, setSearchError] = useState("");

  // Apply "most", "least", "unselected" filters using custom hook
  const filteredBySelection = useSelectionFilteredTutors(
    TutorApplicants,
    tutorSelectFilter as "most" | "least" | "unselected"
  );

  // Effect to update the filtered list whenever the search/filter/sort state changes
  useEffect(() => {
    // Notify parent of the current view mode
    onViewModeChange(tutorSelectFilter);

    // Normalize and validate search input
    const searchQuery = userSearchQuery.toLowerCase().trim();
    const isValidSearch = /^[a-zA-Z\s]*$/.test(searchQuery);
    if (!isValidSearch) {
      setSearchError("Search must only contain letters and spaces.");
      onFilteredchangedList([]);
      return;
    } else {
      setSearchError("");
    }

    // If using predefined filters (most/least/unselected), return early
    if (["unselected", "least", "most"].includes(tutorSelectFilter)) {
      onFilteredchangedList(filteredBySelection);
      return;
    }

    // Otherwise, construct filtered list manually based on course and search criteria
    const SelectedTutors: TutorApplication[] = [];

    TutorApplicants.forEach((tutor) => {
      if (!tutor.appliedRoles?.length) return;

      tutor.appliedRoles.forEach((role) => {
        if (!role.course || !role.course.name) return;

        const courseName = role.course.name.toLowerCase();
        const filteredTutorByCourse =
          filterByCourse === "all" || role.course.id.toString() === filterByCourse;

        // Check if search query matches tutor name, availability, skills, or course
        const queriedTutor =
          searchQuery === "" ||
          `${tutor.firstName} ${tutor.lastName}`.toLowerCase().includes(searchQuery) ||
          role.availability?.toLowerCase().includes(searchQuery) ||
          role.skills?.some((skill) => skill.toLowerCase().includes(searchQuery)) ||
          courseName.includes(searchQuery);

        // If matches, add to the filtered list
        if (filteredTutorByCourse && queriedTutor) {
          SelectedTutors.push({
            ...tutor,
            appliedRole: { ...role },
            availability: role.availability, // from role
            skills: role.skills,             // from role
            rank: role.rank ?? 0,
          });
        }
      });
    });

    // Apply sorting based on course or availability
    if (sortByCourseAvailability === "course" && filterByCourse === "all") {
      SelectedTutors.sort((a, b) => a.appliedRole.course.id - b.appliedRole.course.id);
    } else if (sortByCourseAvailability === "availability") {
      SelectedTutors.sort((a, b) => (a.availability || "").localeCompare(b.availability || ""));
    }

    // Update parent with final filtered list
    onFilteredchangedList(SelectedTutors);
  }, [
    userSearchQuery,
    sortByCourseAvailability,
    filterByCourse,
    tutorSelectFilter,
    TutorApplicants,
  ]);

  return (
    <Filter>
      {/* Display validation error if present */}
      {searchError && <p style={{ color: "red", marginBottom: "0.5rem" }}>{searchError}</p>}

      {/* Search input component */}
      <SearchBar value={userSearchQuery} onChange={setuserSearchQuery} />

      {/* Sort and filter options */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", width: "100%" }}>
        {/* Sort dropdown: disabled when using predefined filters */}
        <SortByCourseOrAvailability
          value={sortByCourseAvailability}
          onChange={setsortByCourseAvailability}
          disabled={["most", "least", "unselected"].includes(tutorSelectFilter)}
          selectedCourseId={filterByCourse}
        />

        {/* Course filter dropdown: disabled when using predefined filters */}
        <CourseBasedFilter
          value={filterByCourse}
          onChange={setfilterByCourse}
          disabled={["least", "most", "unselected"].includes(tutorSelectFilter)}
        />

        {/* Tutor filter (commented out for now) */}
        {/* <TutorFilter value={tutorSelectFilter} onChange={setTutorSelectFilter} /> */}
      </div>
    </Filter>
  );
};

export default SearchSortBar;
