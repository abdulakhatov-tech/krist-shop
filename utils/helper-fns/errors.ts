import { isAxiosError } from "axios";
import { toast } from "sonner";

export const handleApiError = (error: unknown) => {
	if (isAxiosError(error)) {
		toast.error(error?.response?.data?.message || "Something went wrong.");
	} else {
		toast.error("An error occurred.");
	}
};
