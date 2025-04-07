import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { z } from "zod";

import type { IProduct } from "@/interfaces/product.interface";
import type { productFormSchema } from "@/schemas/product";
import {
	type FetchProductsParams,
	useProductsService,
} from "@/services/products/products.service";

export const useProducts = (params: FetchProductsParams = {}) => {
	const { fetchProducts } = useProductsService();

	return useQuery({
		queryKey: ["products", params],
		queryFn: () => fetchProducts(params),
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useGetProduct = (productId: string) => {
	const { fetchProduct } = useProductsService();

	return useQuery({
		queryKey: ["products", productId],
		queryFn: () => fetchProduct(productId),
		enabled: !!productId,
		staleTime: 1000 * 60 * 50,
		retry: 2,
	});
};

export const useAddProduct = () => {
	const queryClient = useQueryClient();
	const { addProduct } = useProductsService();

	return useMutation({
		mutationFn: addProduct,
		onSuccess: () => {
			toast.success("Product added successfully!");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to add product.");
			}
		},
	});
};

export const useEditProduct = (productId: string) => {
	const queryClient = useQueryClient();
	const { editProduct } = useProductsService();

	return useMutation({
		mutationFn: (data: z.infer<typeof productFormSchema>) =>
			editProduct(productId, data),
		onSuccess: () => {
			toast.success("Product edited successfully!");
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["products", productId] });
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	const { deleteProduct } = useProductsService();

	return useMutation({
		mutationFn: async (productId: string) => {
			await deleteProduct(productId);
			return productId;
		},
		onSuccess: (productId: string) => {
			toast.success("Product deleted successfully!");
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["products", productId] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to delete product.");
			}
		},
	});
};

export const useEditProductStock = () => {
	const queryClient = useQueryClient();
	const { editProductStock } = useProductsService();

	return useMutation({
		mutationFn: editProductStock,
		onSuccess: (data: IProduct) => {
			toast.success("Product stocked updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["products", data?.id] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to edit product stock.");
			}
		},
	});
};
