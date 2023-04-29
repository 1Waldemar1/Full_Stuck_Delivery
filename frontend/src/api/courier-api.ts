import { api } from "./api";
import { ICourierForm, ICourierEdit } from "../pages/courier/types";

export const courierApi = {
  path: "courier/",
  async getAll<T>(): Promise<T> {
    return await api.get(this.path);
  },
  async getById(id: string) {
    return await api.get(this.path + id);
  },
  async create(courier: ICourierForm) {
    return await api.post(this.path, courier);
  },
  async update(id: string, courier: ICourierEdit) {
    return await api.put(this.path + id, courier);
  },
  async delete(id: string) {
    return await api.delete(this.path + id);
  },
};
