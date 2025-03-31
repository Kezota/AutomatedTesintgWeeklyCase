import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/services/productService";
import { toast } from "react-toastify";
import {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from "@/lib/types";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useCreateProduct = (): UseMutationResult<
  Product,
  Error,
  CreateProductPayload
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created!");
    },
    onError: () => toast.error("Failed to create product"),
  });
};

export const useUpdateProduct = (): UseMutationResult<
  Product,
  Error,
  UpdateProductPayload
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated!");
    },
    onError: () => toast.error("Failed to update product"),
  });
};

export const useDeleteProduct = (): UseMutationResult<
  Product,
  Error,
  number
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted!");
    },
    onError: () => toast.error("Failed to delete product"),
  });
};
