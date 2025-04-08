import { type AxiosInstance, isAxiosError } from "axios";
import { useAxios } from "../api/axios.service";

interface SubscribeResponse {
	success: boolean;
	message: string;
}

const createUsersService = ($axios: AxiosInstance) => ({
	async subscribeToNewsletter(email: string): Promise<SubscribeResponse> {
		try {
			const { data } = await $axios.post<SubscribeResponse>(
				"/subscribe/newsletter",
				{ email },
			);
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				const message =
					error?.response?.data?.message || "An unexpected error occurred.";
				throw new Error(message);
			}
			throw new Error("Failed to subscribe to the newsletter.");
		}
	},
});

export const useSubscriptionService = () => {
	const axiosInstance = useAxios();
	return createUsersService(axiosInstance);
};
