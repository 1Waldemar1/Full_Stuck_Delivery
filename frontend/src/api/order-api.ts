import { IOrderEdit, IOrderForm } from "../pages/order/types";
import { api } from "./api";

export const OrderApi = {
  path: "order/",
  async getAll<T>(): Promise<T> {
    return await api.get(this.path);
  },
  async getById(id: string) {
    return await api.get(this.path + id);
  },
  async create(product: IOrderForm) {
    return await api.post(this.path, product);
  },
  async update(id: string, product: IOrderEdit) {
    return await api.put(this.path + id, product);
  },
  async delete(id: string) {
    return await api.delete(this.path + id);
  },
};
