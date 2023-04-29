import { IOrder } from "../order/types";
import { IProduct } from "../product/types";

export interface IListOfProducts {
  idList_of_products: string;
  order: Pick<IOrder, "idOrder" | "address" | "order_creation_date">;
  product: Pick<IProduct, "idProduct" | "name">;
  quantity: number;
}

export interface IListOfProductsForm {
  idOrder: IOrder;
  idProduct: IProduct;
  quantity: number;
}
export interface IListOfProductsEdit extends Partial<IListOfProductsForm> {}
