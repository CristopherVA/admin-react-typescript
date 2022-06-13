export interface UserInterface {
  count: Array<[]>;
  user: Array<DataUser>;
  ok: Boolean;
  msg: String;
}

export interface DataUser {
  id: number;
  name: String;
  firstLastName: String;
  secondLastName: String;
  cedula: Number;
  edad: Number;
  gender: String;
  address: String;
  telephone: Number;
  email: String;
  password: String;
  civilStatu: String;
  haveChild: String;
  dateBirth: Date;
}

export interface GetOneUser {
  user: DataUser;
}


export type Mutation = {
  data: Object;
}



export interface UpdateDataForm {
  id: Number;
  data: {};
}

export interface Pagination {
  to: String;
  from: String;
}

export interface Auth {
  email: String;
  password: String;
}
