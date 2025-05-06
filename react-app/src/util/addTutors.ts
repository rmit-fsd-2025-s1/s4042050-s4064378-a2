import {mockTutors} from "../mockData/mockData"

export const saveTutors = () => {
    const existing = localStorage.getItem("tutors");
    if (!existing) {
      localStorage.setItem("tutors", JSON.stringify(mockTutors));
      console.log("Tutors saved to local storage");
    } else {
      console.log("Tutors already exists in the local storage");
    }
  };