import { IProduct } from "../../pages/product/types";

export interface IProductForm extends Omit<IProduct, 'idProduct'> {}