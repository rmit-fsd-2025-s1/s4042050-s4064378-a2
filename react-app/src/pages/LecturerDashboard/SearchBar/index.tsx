import React, { useState, useEffect } from "react";
import { Tutor, TutorApplication, TutorRole } from "../../../types/Tutor";
import { SortOption } from "../../../types/sortTypes";
import { mockCourses } from "../../../mockData/mockData";
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
  //Sort for, by availability of course
  const [sortByCourseAvailability, setsortByCourseAvailability] = useState<SortOption>("course");
  //Filter tutors based on most selected, lease selected not selected
  const [tutorSelectFilter, setTutorSelectFilter] = useState("all");
  // Query tutor based on name, course,skill availability
  const [userSearchQuery, setuserSearchQuery] = useState("");
  //Filter by course
  const [filterByCourse, setfilterByCourse] = useState("all");

  const [searchError, setSearchError] = useState("");


  const filteredBySelection = useSelectionFilteredTutors(
    TutorApplicants,
    tutorSelectFilter as "most" | "least" | "unselected"
  );


  useEffect(() => {
    onViewModeChange(tutorSelectFilter);
    const searchQuery = userSearchQuery.toLowerCase().trim();
    
    // Validation added, Only string can be entered when Query tutor 
    // based on name, course,skill availability
    const isValidSearch = /^[a-zA-Z\s]*$/.test(searchQuery);
    if (!isValidSearch) {
      setSearchError("Search must only contain letters and spaces.");
      onFilteredchangedList([]);
      return;
    } else {
      setSearchError("");
    }
    
    // Hook is used to filer the applicants based on most selected, lease selected not selected
    if (["unselected", "least", "most"].includes(tutorSelectFilter)) {
      onFilteredchangedList(filteredBySelection);
      return;
    }
    
      
    

    // Filter the user based on selected courses
    // Query tutor based on name, course,skill availability
    // Tutors who match both filter and query are selcted and stored in SelectedTutors
    const SelectedTutors: TutorApplication[] = [];
    // Tutors are filterd based on course
    TutorApplicants.forEach((tutor) => {
      if (!tutor.appliedRoles?.length) return;
      tutor.appliedRoles.forEach((role) => {
        const courseName = mockCourses.find((c) => c.id === role.courseId)?.name.toLowerCase() ?? "";
        const filteredTutorByCourse = filterByCourse === "all" || role.courseId === filterByCourse;

        //Tutors are quiried based on name, course,skill availability
        const quriedTutors =
          searchQuery === "" ||
          `${tutor.firstName} ${tutor.lastName}`.toLowerCase().includes(searchQuery) ||
          tutor.availability?.toLowerCase().includes(searchQuery) ||
          tutor.skills?.some((skill) => skill.toLowerCase().includes(searchQuery)) ||
          courseName.includes(searchQuery);
        // If a tutor match both conditions inserted into SelectedTutors
        if (filteredTutorByCourse && quriedTutors) {
          SelectedTutors.push({
            ...tutor,
            rank: role.rank ?? 0,
            appliedRole: role,
            course: role.courseId,
            status: role.status,

          });
        }
      });
    });

    // Sorting tutors based on course or availability.
    // Sorting by course is only enabled only if course filter is all
    if (sortByCourseAvailability === "course" && filterByCourse === "all") {
      SelectedTutors.sort((a, b) => a.course.localeCompare(b.course));
    } else if (sortByCourseAvailability === "availability") {
      SelectedTutors.sort((a, b) => a.availability.localeCompare(b.availability));
    }

    onFilteredchangedList(SelectedTutors);
  }, [userSearchQuery, sortByCourseAvailability, filterByCourse, tutorSelectFilter, TutorApplicants]);

  // For each filter and sorting tasks different components are created and used here
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

        <TutorFilter value={tutorSelectFilter} onChange={setTutorSelectFilter} />
      </div>
    </Filter>

  );
};

export default SearchSortBar;
