import { IClientEdit, IClientForm } from "../pages/client/types";
import { api } from "./api";

export const clientApi = {
  path: "client/",
  async getAll<T>(): Promise<T> {
    return await api.get(this.path);
  },
  async getById(id: string) {
    return await api.get(this.path + id);
  },
  async create(client: IClientForm) {
    return await api.post(this.path, client);
  },
  async update(id: string, client: IClientEdit) {
    return await api.put(this.path + id, client);
  },
  async delete(id: string) {
    return await api.delete(this.path + id);
  },
};
