import type { INewsletter } from "@/interfaces/newsletter.interface";
import { type AxiosInstance, isAxiosError } from "axios";
import { useAxios } from "../api/axios.service";

export interface FetchNewsletterParams {
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

const createNewslettersService = ($axios: AxiosInstance) => ({
	async fetchNewsletters(
		params: FetchNewsletterParams,
	): Promise<PaginatedResponse<INewsletter>> {
		try {
			const { data } = await $axios.get("/subscribe/newsletter", { params });
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch newsletters.");
		}
	},

	async deleteNewsletter(newsletterId: string): Promise<void> {
		try {
			await $axios.delete(`/subscribe/newsletter/${newsletterId}`);
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to delete newsletter.");
		}
	},
});

export const useNewslettersService = () => {
	const axiosInstance = useAxios();
	return createNewslettersService(axiosInstance);
};
