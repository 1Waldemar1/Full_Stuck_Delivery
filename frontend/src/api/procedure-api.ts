import { IProcedure } from "../pages/procedure/types";
import { api } from "./api";

export const ProcedureApi = {
  path: "procedure/",
  async create(procedure: IProcedure) {
    return await api.post(this.path, procedure);
  },
};
