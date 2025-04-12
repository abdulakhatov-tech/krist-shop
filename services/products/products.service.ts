import { type AxiosInstance, isAxiosError } from "axios";
import type { z } from "zod";

import type { IProduct } from "@/interfaces/product.interface";
import type { productFormSchema } from "@/schemas/product";
import { useAxios } from "../api/axios.service";

export interface FetchProductsParams {
	page?: number;
	limit?: number;
	minPrice?: number;
	maxPrice?: number;
	category?: string;
	subcategory?: string;
}

interface PaginatedResponse<T> {
	success: boolean;
	message: string;
	data: T[];
	pagination: PaginationType;
}

const createProductsService = ($axios: AxiosInstance) => ({
	async fetchProducts(
		params: FetchProductsParams,
	): Promise<PaginatedResponse<IProduct>> {
		try {
			const { data } = await $axios.get("/products", { params });
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch products.");
		}
	},

	async fetchProductsWithoutPagination(): Promise<IProduct[]> {
		try {
			const { data } = await $axios.get("/products/all");
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch products.");
		}
	},

	async fetchProduct(productId: string): Promise<IProduct> {
		try {
			const { data } = await $axios.get(`/products/${productId}`);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch product.");
		}
	},

	async fetchBestSellingProducts(): Promise<IProduct[]> {
		try {
			const { data } = await $axios.get("/products/all/best-sellers");
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch best sellers.");
		}
	},

	async fetchNewArrivals(): Promise<IProduct[]> {
		try {
			const { data } = await $axios.get("/products/all/new-arrivals");
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch new arrivals.");
		}
	},

	async fetchFeaturedProducts(): Promise<IProduct[]> {
		try {
			const { data } = await $axios.get("/products/all/featured");
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch featured products.");
		}
	},

	async addProduct(
		body: z.infer<typeof productFormSchema> & { createdBy?: string },
	): Promise<IProduct> {
		try {
			const { data } = await $axios.post("/products", body);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to add new size.");
		}
	},

	async editProduct(
		productId: string,
		body: z.infer<typeof productFormSchema>,
	): Promise<IProduct> {
		try {
			const { data } = await $axios.patch(`/products/${productId}`, body);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to edit product.");
		}
	},

	async deleteProduct(productId: string): Promise<void> {
		try {
			await $axios.delete(`/products/${productId}`);
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to delete product.");
		}
	},

	async editProductStock({
		productId,
		body,
	}: {
		productId: string;
		body: { color: string; size: string; quantity: number }[];
	}): Promise<IProduct> {
		try {
			const { data } = await $axios.patch(`/products/stock/${productId}`, body);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to edit product stock.");
		}
	},
});

export const useProductsService = () => {
	const axiosInstance = useAxios();
	return createProductsService(axiosInstance);
};
