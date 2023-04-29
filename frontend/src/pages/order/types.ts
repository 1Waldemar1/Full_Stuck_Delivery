import { IClient } from "../client/types";
import { ICourier } from "../courier/types";

export interface IOrder {
  idOrder: string;
  address: string;
  order_creation_date: string;
  sum: number;
  client: Pick<IClient, "idClient" | "full_name">;
  courier: Pick<ICourier, "idCourier" | "full_name">;
}

export interface IOrderForm {
  idClient: IClient;
  idCourier: ICourier;
  address: string;
  order_creation_date: Date;
}
export interface IOrderEdit extends Partial<IOrderForm> {}
