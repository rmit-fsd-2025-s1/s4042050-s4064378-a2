import { Application } from "../types/Application";
import { api } from "./axios";

export const applicationApi = {
  create: async (application: Partial<Application>) => {
    const response = await api.post("/applications", application);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/applications");
    return response.data;
  },

  getApplicationsByCandidateId: async (candidateId: number) => {
    const response = await api.get(`/applications/${candidateId}`);
    return response.data;
  },
};
