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

	async fetchSubCategoriesByCategory(
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
			throw new Error("Failed to fetch subcategories by category.");
		}
	},
});

export const useSubcategoriesService = () => {
	const axiosInstance = useAxios();
	return createSubcategoriesService(axiosInstance);
};
