import type { IWishlist } from "@/interfaces/wishlist.interface";
import { type AxiosInstance, isAxiosError } from "axios";
import { useAxios } from "../api/axios.service";

interface IBody {
	userId: string;
	productId: string;
}

const createWishlistService = ($axios: AxiosInstance) => ({
	async addToWishlist(body: IBody): Promise<IWishlist> {
		try {
			const { data } = await $axios.post("/wishlist", body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to add to wishlist.");
		}
	},

	async removeFromWishlist({
		userId,
		productId,
	}: Omit<IBody, "quantity">): Promise<IWishlist> {
		try {
			const { data } = await $axios.delete(`/wishlist/${userId}/${productId}`);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to delete product from Wishlist.");
		}
	},

	async getWishlist(userId: string): Promise<IWishlist[]> {
		try {
			const { data } = await $axios.get(`/wishlist/${userId}`);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch wishlist.");
		}
	},
});

export const useWishlistService = () => {
	const axiosInstance = useAxios();
	return createWishlistService(axiosInstance);
};
