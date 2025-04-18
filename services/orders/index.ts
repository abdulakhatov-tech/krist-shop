import type { IOrder } from "@/interfaces/order.interface";
import { type AxiosInstance, isAxiosError } from "axios";
import { useAxios } from "../api/axios.service";

export interface ICreateOrderBody {
	userId: string;
	products?: { productId: string; quantity: number }[];
	delivery_method: "pickup" | "courier" | "postal";
	payment_method: "cash" | "payme" | "click";
	region: string;
	district: string;
	extraAddress: string;
	shipping: number;
	coupon: number;
}

const createOrdersService = ($axios: AxiosInstance) => ({
	async createOrder(body: ICreateOrderBody): Promise<IOrder> {
		try {
			const { data } = await $axios.post("/orders", body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to create order.");
		}
	},

	async getUserOrders(userId: string): Promise<IOrder[]> {
		try {
			const { data } = await $axios.get(`/orders/user/${userId}`);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to get user orders!");
		}
	},
});

export const useOrdersService = () => {
	const axiosInstance = useAxios();
	return createOrdersService(axiosInstance);
};
