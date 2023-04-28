import { IProductEdit, IProductForm } from "../pages/product/types";
import { api } from "./api";

export const productApi = {
  path: "product/",
  async getAll<T>(): Promise<T> {
    return await api.get(this.path);
  },
  async getById(id: string) {
    return await api.get(this.path + id);
  },
  async create(product: IProductForm) {
    return await api.post(this.path, product);
  },
  async update(id: string, product: IProductEdit) {
    return await api.put(this.path + id, product);
  },
  async delete(id: string) {
    return await api.delete(this.path + id);
  },
};
