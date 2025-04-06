import type { ISize } from "@/interfaces/size.interface";
import { type AxiosInstance, isAxiosError } from "axios";
import { useAxios } from "../api/axios.service";

const createSizesService = ($axios: AxiosInstance) => ({
	async fetchSizes(): Promise<ISize[]> {
		try {
			const { data } = await $axios.get("/sizes");
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch sizes.");
		}
	},
});

export const useSizesService = () => {
	const axiosInstance = useAxios();
	return createSizesService(axiosInstance);
};
