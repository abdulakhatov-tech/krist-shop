import type { ICategory } from "@/interfaces/category.interface";
import type { categoryFormSchema } from "@/schemas/category";
import { type AxiosInstance, isAxiosError } from "axios";
import type { z } from "zod";
import { useAxios } from "../api/axios.service";

export interface FetchCategoriesParams {
	page?: number;
	limit?: number;
	search?: string;
}

interface PaginatedResponse<T> {
	success: boolean;
	message: string;
	data: T[];
	pagination: PaginationType;
}

const createCategoriesService = ($axios: AxiosInstance) => ({
	async fetchCategories(): Promise<ICategory[]> {
		try {
			const { data } = await $axios.get("/categories");
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch categories.");
		}
	},

	async fetchCategory(categoryId: string): Promise<ICategory> {
		try {
			const { data } = await $axios.get(`/categories/${categoryId}`);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch category.");
		}
	},

	async fetchCategoriesWithPagination(
		params: FetchCategoriesParams,
	): Promise<PaginatedResponse<ICategory>> {
		try {
			const { data } = await $axios.get("/categories/all", { params });
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch categories.");
		}
	},

	async addCategory(
		body: z.infer<typeof categoryFormSchema>,
	): Promise<ICategory> {
		try {
			const { data } = await $axios.post("/categories", body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to add new category.");
		}
	},

	async editCategory({
		categoryId,
		body,
	}: {
		categoryId: string;
		body: z.infer<typeof categoryFormSchema>;
	}): Promise<ICategory> {
		try {
			const { data } = await $axios.patch(`/categories/${categoryId}`, body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to edit category.");
		}
	},

	async deleteCategory(categoryId: string): Promise<void> {
		try {
			await $axios.delete(`/categories/${categoryId}`);
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to delete category.");
		}
	},
});

export const useCategoriesService = () => {
	const axiosInstance = useAxios();
	return createCategoriesService(axiosInstance);
};
