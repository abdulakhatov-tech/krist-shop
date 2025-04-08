import { useSubscriptionService } from "@/services/subscription";
import { isAxiosError } from "axios";
import { type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

const useFooterFeatures = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const { subscribeToNewsletter } = useSubscriptionService();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget; // 👈 store reference early
		const email = emailRef.current?.value?.trim();

		if (!email) {
			toast.warning("Please enter a valid email address.");
			return;
		}

		try {
			setIsSubmitting(true);
			const { message } = await subscribeToNewsletter(email);
			toast.success(message || "Successfully subscribed!");
			form.reset(); // 👈 use stored reference
		} catch (error: unknown) {
			let errorMessage = "Something went wrong. Please try again.";

			if (isAxiosError(error) && error.response?.data?.message) {
				errorMessage = error.response.data.message;
			} else if (error instanceof Error) {
				errorMessage = error.message;
			}

			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		handleFormSubmit,
		emailRef,
		isSubmitting, // useful to disable the button while sending
	};
};

export default useFooterFeatures;
