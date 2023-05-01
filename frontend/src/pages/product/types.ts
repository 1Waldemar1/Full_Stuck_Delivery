export interface IProduct {
  idProduct: string;
  name: string;
  price: number;
}

export interface IProductForm extends Omit<IProduct, "idProduct"> {}
export interface IProductEdit extends Partial<IProduct> {}
