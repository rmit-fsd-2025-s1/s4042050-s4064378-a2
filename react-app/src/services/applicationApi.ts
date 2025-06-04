import { Application } from "../types/Application";
import { api } from "./axios";

export const applicationApi = {
  create: async (application: Partial<Application>) => {
    const response = await api.post("/applications", application);
    return response.data;
  },
};
