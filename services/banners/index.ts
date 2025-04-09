import type { IBanner } from "@/interfaces/banner.interface";
import type { bannerFormSchema } from "@/schemas/banner";
import { type AxiosInstance, isAxiosError } from "axios";
import type { z } from "zod";
import { useAxios } from "../api/axios.service";

export interface FetchBannersParams {
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

const createBannersService = ($axios: AxiosInstance) => ({
	async fetchBanners(
		params: FetchBannersParams,
	): Promise<PaginatedResponse<IBanner>> {
		try {
			const { data } = await $axios.get("/banners", { params });
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch banners.");
		}
	},

	async fetchBannersWithoutPagination(): Promise<IBanner[]> {
		try {
			const { data } = await $axios.get("/banners/all");
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch banners.");
		}
	},

	async fetchBanner(bannerId: string): Promise<IBanner> {
		try {
			const { data } = await $axios.get(`/banners/${bannerId}`);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch banner.");
		}
	},

	async addBanner(body: z.infer<typeof bannerFormSchema>): Promise<IBanner> {
		try {
			const { data } = await $axios.post("/banners", body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to add new banner.");
		}
	},

	async editBanner({
		bannerId,
		body,
	}: {
		bannerId: string;
		body: z.infer<typeof bannerFormSchema>;
	}): Promise<IBanner> {
		try {
			const { data } = await $axios.patch(`/banners/${bannerId}`, body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to edit banner.");
		}
	},

	async deleteBanner(bannerId: string): Promise<void> {
		try {
			await $axios.delete(`/banners/${bannerId}`);
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to delete banner.");
		}
	},
});

export const useBannersService = () => {
	const axiosInstance = useAxios();
	return createBannersService(axiosInstance);
};
