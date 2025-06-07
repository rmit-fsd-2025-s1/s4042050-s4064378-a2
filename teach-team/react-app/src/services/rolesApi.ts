import { api } from "./axios";

export const rolesApi = {
  getAll: async () => {
    const response = await api.get("/roles");
    return response.data;
  },
};
