import { API } from "@/lib/API";
import { Product } from "@/lib/types";
import { toast } from "react-toastify";

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await API.get<Product[]>("/products");
    return response.data;
  } catch (error) {
    toast.error("Error fetching products.");
    throw error; // Re-throw error for handling in component if needed
  }
};

// Add new product
export const addProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await API.post<Product>("/products", product);
    toast.success("Product added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Error adding product.");
    throw error; // Re-throw error for handling in component
  }
};

// Update product
export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await API.put<Product>(`/products/${product.id}`, product);
    toast.success("Product updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Error updating product.");
    throw error; // Re-throw error for handling in component
  }
};

// Delete product
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await API.delete(`/products/${id}`);
    toast.success("Product deleted successfully!");
  } catch (error) {
    toast.error("Error deleting product.");
    throw error; // Re-throw error for handling in component
  }
};
