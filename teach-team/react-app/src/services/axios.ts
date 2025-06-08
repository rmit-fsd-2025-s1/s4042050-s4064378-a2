import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
export const api = axios.create({
  baseURL: BASE_URL, // Adjust this to match your backend URL
});
