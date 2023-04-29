export interface IClient {
  idClient: string;
  full_name: string;
  address: string;
  phone: string;
}

export interface IClientForm extends Omit<IClient, "idClient"> {}
export interface IClientEdit extends Partial<IClient> {}
