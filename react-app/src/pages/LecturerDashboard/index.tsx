import React, { useEffect, useState } from "react";
import { Tutor ,TutorApplication} from "../../types/Tutor";
import { SortOption } from "../../types/sortTypes"
import { loadTutors } from "../../util/localStorage"
import TutorList from "./TutorListcom"
import SearchSortBar from "./SearchBar/index"
import TutorOverviewList from "./TutorOverviewList"
import { Page } from "./styles/Layout";
import { Dashboard } from "../../components/DashBoard";


// This is the main component of lecture dashboard

export const LecturerPage = ({navigateTo}:{navigateTo:(page: any) => void;}) => {
  const [filteredTutors, setFilteredTutors] = useState<TutorApplication[]>([])
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [viewMode, setViewMode] = useState("all");

  useEffect(() => {
    const data = loadTutors();
    setTutors(data);
  }, []);

  useEffect(() => {
  }, [tutors]);

// There are tow views
// 1. if the most selected, least selected and not selected filter is enabled, view on is rendered
// 2. If above filter is not selected view 2 is rendered
  return (
    <Page>
      <Dashboard header={"Lecturer Dashboard"} navigateTo={navigateTo} />
      <SearchSortBar
        TutorApplicants={tutors}
        onFilteredchangedList={setFilteredTutors}
        onViewModeChange={setViewMode}
      />
      {["most", "least", "unselected"].includes(viewMode) ? (
        <TutorOverviewList tutors={filteredTutors} />
      ) : (
        <TutorList tutors={filteredTutors} />
      )}
    </Page>
  );

};