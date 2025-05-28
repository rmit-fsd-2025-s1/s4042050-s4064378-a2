import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tutor, TutorApplication } from "../../types/Tutor";
import { SortOption } from "../../types/sortTypes";
import TutorList from "./TutorListcom";
import SearchSortBar from "./SearchBar/index";
import TutorOverviewList from "./TutorOverviewList";
import { Page } from "./styles/Layout";
import { Dashboard } from "../../components/DashBoard";

// This is the main component of lecturer dashboard

export const LecturerPage = ({
  navigateTo,
}: {
  navigateTo: (page: any) => void;
}) => {
  const [filteredTutorApps, setFilteredTutorApps] = useState<TutorApplication[]>([]);
  const [filteredTutorObjects, setFilteredTutorObjects] = useState<Tutor[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [viewMode, setViewMode] = useState("all");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/applications`
        );
        setTutors(res.data);
      } catch (error) {
        console.error("Error fetching tutor applications:", error);
      }
    };

    fetchTutors();
  }, []);

  // There are two views:
  // 1. If the most selected, least selected, or not selected filter is enabled → overview view
  // 2. Otherwise, show detailed list
  return (
    <Page>
      <Dashboard header={"Lecturer Dashboard"} navigateTo={navigateTo} />
      <SearchSortBar
        TutorApplicants={tutors}
        onFilteredchangedList={(filtered) => {
          if (["most", "least", "unselected"].includes(viewMode)) {
            setFilteredTutorObjects(tutors);
          } else {
            setFilteredTutorApps(filtered as TutorApplication[]);
          }
        }}
        onViewModeChange={setViewMode}
      />
      {["most", "least", "unselected"].includes(viewMode) ? (
        <TutorOverviewList tutors={filteredTutorObjects} />
      ) : (
        <TutorList tutors={filteredTutorApps} />
      )}
    </Page>
  );
};
