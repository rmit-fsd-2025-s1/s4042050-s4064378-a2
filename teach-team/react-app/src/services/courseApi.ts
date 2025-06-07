import { api } from "./axios";

export const courseApi = {
  getAllCourses: async () => {
    const response = await api.get("/courses");
    return response.data;
  },
};
