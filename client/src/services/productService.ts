import { API } from "@/lib/API";
import {
  CreateProductPayload,
  Product,
  ProductListResponse,
  ProductResponse,
  UpdateProductPayload,
} from "@/lib/types";

export const getProducts = async (): Promise<Product[]> => {
  const res = await API.get<ProductListResponse>("/products");
  return res.data.data;
};

export const createProduct = async (
  payload: CreateProductPayload
): Promise<Product> => {
  const res = await API.post<ProductResponse>("/products", payload);
  return res.data.data;
};

export const updateProduct = async (
  payload: UpdateProductPayload
): Promise<Product> => {
  const res = await API.put<ProductResponse>(
    `/products/${payload.id}`,
    payload
  );
  return res.data.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  const res = await API.delete<ProductResponse>(`/products/${id}`);
  return res.data.data;
};
