import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/teach_team", // Adjust this to match your backend URL
});
