import React, { useState, useEffect } from "react";
import { Tutor, TutorApplication } from "../../../types/Tutor";
import { SortOption } from "../../../types/sortTypes";
import SearchBar from "./SearchBar";
import SortByCourseOrAvailability from "./SortByCourseOrAvailability";
import CourseBasedFilter from "./CourseBasedFilter";
import TutorFilter from "./TutorFilter";
import { Filter } from "../styles/Filters";
import { useSelectionFilteredTutors } from "../../../hooks/useSelectionFilteredTutors";

interface Props {
  onFilteredchangedList: (filtered: TutorApplication[]) => void;
  TutorApplicants: Tutor[];
  onViewModeChange: (viewMode: string) => void;
}

const SearchSortBar: React.FC<Props> = ({
  TutorApplicants,
  onFilteredchangedList,
  onViewModeChange,
}) => {
  const [sortByCourseAvailability, setsortByCourseAvailability] = useState<SortOption>("course");
  const [tutorSelectFilter, setTutorSelectFilter] = useState("all");
  const [userSearchQuery, setuserSearchQuery] = useState("");
  const [filterByCourse, setfilterByCourse] = useState("all");
  const [searchError, setSearchError] = useState("");

  const filteredBySelection = useSelectionFilteredTutors(
    TutorApplicants,
    tutorSelectFilter as "most" | "least" | "unselected"
  );

  useEffect(() => {
    onViewModeChange(tutorSelectFilter);
    const searchQuery = userSearchQuery.toLowerCase().trim();

    const isValidSearch = /^[a-zA-Z\s]*$/.test(searchQuery);
    if (!isValidSearch) {
      setSearchError("Search must only contain letters and spaces.");
      onFilteredchangedList([]);
      return;
    } else {
      setSearchError("");
    }

    if (["unselected", "least", "most"].includes(tutorSelectFilter)) {
      onFilteredchangedList(filteredBySelection);
      return;
    }

    const SelectedTutors: TutorApplication[] = [];

    TutorApplicants.forEach((tutor) => {
      if (!tutor.appliedRoles?.length) return;

      tutor.appliedRoles.forEach((role) => {
        if (!role.course || !role.course.name) return;

        const courseName = role.course.name.toLowerCase();
        const filteredTutorByCourse =
          filterByCourse === "all" || role.course.id.toString() === filterByCourse;

        const queriedTutor =
          searchQuery === "" ||
          `${tutor.firstName} ${tutor.lastName}`.toLowerCase().includes(searchQuery) ||
          role.availability?.toLowerCase().includes(searchQuery) ||
          role.skills?.some((skill) => skill.toLowerCase().includes(searchQuery)) ||
          courseName.includes(searchQuery);

        if (filteredTutorByCourse && queriedTutor) {
          SelectedTutors.push({
            ...tutor,
            appliedRole: { ...role },
            availability: role.availability, // ✅ from role
            skills: role.skills,             // ✅ from role
            rank: role.rank ?? 0,
          });
        }
      });
    });

    if (sortByCourseAvailability === "course" && filterByCourse === "all") {
      SelectedTutors.sort((a, b) => a.appliedRole.course.id - b.appliedRole.course.id);
    } else if (sortByCourseAvailability === "availability") {
      SelectedTutors.sort((a, b) => (a.availability || "").localeCompare(b.availability || ""));
    }

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
      {searchError && <p style={{ color: "red", marginBottom: "0.5rem" }}>{searchError}</p>}
      <SearchBar value={userSearchQuery} onChange={setuserSearchQuery} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", width: "100%" }}>
        <SortByCourseOrAvailability
          value={sortByCourseAvailability}
          onChange={setsortByCourseAvailability}
          disabled={["most", "least", "unselected"].includes(tutorSelectFilter)}
          selectedCourseId={filterByCourse}
        />

        <CourseBasedFilter
          value={filterByCourse}
          onChange={setfilterByCourse}
          disabled={["least", "most", "unselected"].includes(tutorSelectFilter)}
        />

        {/* <TutorFilter value={tutorSelectFilter} onChange={setTutorSelectFilter} /> */}
      </div>
    </Filter>
  );
};

export default SearchSortBar;
