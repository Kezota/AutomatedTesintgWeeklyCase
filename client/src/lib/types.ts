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

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  confirmPassword: string;
};

export type LoginRegisterResponse = {
  token: string;
  user: Admin;
};

export type CreateProductPayload = {
  name: string;
  stock: number;
};

export type UpdateProductPayload = {
  id: number;
  name: string;
  stock: number;
};

export type ProductListResponse = {
  message: string;
  data: Product[];
};

export type ProductResponse = {
  message: string;
  data: Product;
};
