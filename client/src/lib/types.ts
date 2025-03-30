export type Admin = {
  id?: number;
  email: string;
  password: string;
  token?: string;
};

export type Product = {
  id?: number;
  name: string;
  stock: number;
};

export type LoginFields = {
  email: string;
  password: string;
};

export type RegisterFields = LoginFields & {
  confirmPassword: string;
};
