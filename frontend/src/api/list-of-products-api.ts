import {
  IListOfProductsForm,
  IListOfProductsEdit,
} from "../pages/list-of-products/types";
import { api } from "./api";

export const ListOfProductsApi = {
  path: "list-of-products/",
  async getAll<T>(): Promise<T> {
    return await api.get(this.path);
  },
  async getById(id: string) {
    return await api.get(this.path + id);
  },
  async create(product: IListOfProductsForm) {
    return await api.post(this.path, product);
  },
  async update(id: string, product: IListOfProductsEdit) {
    return await api.put(this.path + id, product);
  },
  async delete(id: string) {
    return await api.delete(this.path + id);
  },
};
