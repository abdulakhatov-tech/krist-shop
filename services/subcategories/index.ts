import type { ISubcategory } from "@/interfaces/subcategory.interface";
import type { subcategoryFormSchema } from "@/schemas/subcategory";
import { type AxiosInstance, isAxiosError } from "axios";
import type { z } from "zod";
import { useAxios } from "../api/axios.service";

export interface FetchSubcategoriesParams {
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

const createSubcategoriesService = ($axios: AxiosInstance) => ({
	async fetchSubCategories(): Promise<ISubcategory[]> {
		try {
			const { data } = await $axios.get("/subcategories");
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch subcategories.");
		}
	},

	async fetchSubCategoriesByCategorySlug(
		categorySlug: string,
	): Promise<ISubcategory[]> {
		try {
			const { data } = await $axios.get(
				`/categories/slug/${categorySlug}/subcategories`,
			);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch subcategories by category slug.");
		}
	},

	async fetchSubcategory(subcategoryId: string): Promise<ISubcategory> {
		try {
			const { data } = await $axios.get(`/subcategories/${subcategoryId}`);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch subcategory.");
		}
	},

	async fetchSubcategoriesWithPagination(
		params: FetchSubcategoriesParams,
	): Promise<PaginatedResponse<ISubcategory>> {
		try {
			const { data } = await $axios.get("/subcategories/all", { params });
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch subcategories.");
		}
	},

	async fetchSubCategoriesByCategoryId(
		categoryId: string,
	): Promise<ISubcategory[]> {
		try {
			const { data } = await $axios.get(
				`/categories/${categoryId}/subcategories`,
			);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch subcategories by category id.");
		}
	},

	async addSubcategory(
		body: z.infer<typeof subcategoryFormSchema>,
	): Promise<ISubcategory> {
		try {
			const { data } = await $axios.post("/subcategories", body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to add new subcategory.");
		}
	},

	async editSubcategory({
		subcategoryId,
		body,
	}: {
		subcategoryId: string;
		body: z.infer<typeof subcategoryFormSchema>;
	}): Promise<ISubcategory> {
		try {
			const { data } = await $axios.patch(
				`/subcategories/${subcategoryId}`,
				body,
			);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to edit subcategory.");
		}
	},

	async deleteSubcategory(subcategoryId: string): Promise<void> {
		try {
			await $axios.delete(`/subcategories/${subcategoryId}`);
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to delete subcategory.");
		}
	},
});

export const useSubcategoriesService = () => {
	const axiosInstance = useAxios();
	return createSubcategoriesService(axiosInstance);
};
