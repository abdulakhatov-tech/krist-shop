import type { AxiosInstance } from "axios";
import { useAxios } from "../api/axios.service";

interface ContactUsPayload {
	name: string;
	email: string;
	phoneNumber: string;
	message: string;
}

const createContactUsService = ($axios: AxiosInstance) => ({
	async sendContactForm(payload: ContactUsPayload) {
		const response = await $axios.post("/contact-us", payload);
		return response.data;
	},
});

export const useContactUsService = () => {
	const axiosInstance = useAxios();
	return createContactUsService(axiosInstance);
};
