import { User } from "../types/User";
import { api } from "./axios";

export const candidateApi = {
  getAllCandidates: async () => {
    const response = await api.get("/candidate");
    return response.data;
  },

  getCandidateByUserId: async (user_id: number) => {
    const response = await api.get(`/candidate/${user_id}`);
    return response.data;
  },

  createCandidate: async (user: Partial<User>) => {
    const response = await api.post("/candidate", user);
    return response.data;
  },

  updateCandidate: async (id: number, user: Partial<User>) => {
    const response = await api.put(`/candidate/${id}`, user);
    return response.data;
  },

  deleteCandidate: async (id: number) => {
    const response = await api.delete(`/candidate/${id}`);
    return response.data;
  },
};
