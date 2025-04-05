import type { ICategory } from "@/interfaces/category.interface";
import { type AxiosInstance, isAxiosError } from "axios";
import { useAxios } from "../api/axios.service";

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
			throw new Error("Failed to fetch user.");
		}
	},
});

export const useCategoriesService = () => {
	const axiosInstance = useAxios();
	return createCategoriesService(axiosInstance);
};
