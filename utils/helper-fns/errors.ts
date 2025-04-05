import { isAxiosError } from "axios";
import { toast } from "sonner";

export const handleApiError = (error: unknown) => {
	if (isAxiosError(error)) {
		const errorMessage =
			error.response?.data?.message || "Something went wrong.";
		toast.error(errorMessage);
	} else if (error instanceof Error) {
		// Check if the error is an instance of Error for proper type narrowing
		toast.error(error.message || "An unexpected error occurred.");
	} else {
		toast.error("An unknown error occurred.");
	}
};
