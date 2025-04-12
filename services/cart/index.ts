import type { ICart } from "@/interfaces/cart.interface";
import { type AxiosInstance, isAxiosError } from "axios";
import { useAxios } from "../api/axios.service";

interface IBody {
	userId: string;
	productId: string;
	quantity: number;
}

const createCartService = ($axios: AxiosInstance) => ({
	async addToCart(body: IBody): Promise<ICart> {
		try {
			const { data } = await $axios.post("/cart", body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to add to cart.");
		}
	},

	async updateQuantity(body: IBody): Promise<ICart> {
		try {
			const { data } = await $axios.patch("/cart", body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to update cart item.");
		}
	},

	async removeFromCart({
		userId,
		productId,
	}: Omit<IBody, "quantity">): Promise<ICart> {
		try {
			const { data } = await $axios.delete(`/cart/${userId}/${productId}`);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to delete cart item.");
		}
	},

	async getCart(userId: string): Promise<ICart[]> {
		try {
			const { data } = await $axios.get(`/cart/${userId}`);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch cart.");
		}
	},
});

export const useCartService = () => {
	const axiosInstance = useAxios();
	return createCartService(axiosInstance);
};
