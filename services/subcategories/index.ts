import type { ISubcategory } from "@/interfaces/subcategory.interface";
import { type AxiosInstance, isAxiosError } from "axios";
import { useAxios } from "../api/axios.service";

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
});

export const useSubcategoriesService = () => {
	const axiosInstance = useAxios();
	return createSubcategoriesService(axiosInstance);
};
