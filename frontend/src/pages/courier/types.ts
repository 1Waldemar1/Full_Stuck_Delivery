export interface ICourier {
  idCourier: string;
  full_name: string;
  phone: string;
}

export interface ICourierForm extends Omit<ICourier, "idCourier"> {}
export interface ICourierEdit extends Partial<ICourier> {}
