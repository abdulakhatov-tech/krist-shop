import { type AxiosInstance, isAxiosError } from "axios";
import { useAxios } from "../api/axios.service";

interface ApplyResponseT {
	coupon: string;
	discount: number;
	total: number;
}

interface IBody {
	code: string;
	subtotal: number;
}

const createCouponService = ($axios: AxiosInstance) => ({
	async applyCoupon(body: IBody): Promise<ApplyResponseT> {
		try {
			const { data } = await $axios.post("/coupon/apply", body);
			return data?.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to apply coupon code!");
		}
	},
});

export const useCouponService = () => {
	const axiosInstance = useAxios();
	return createCouponService(axiosInstance);
};
