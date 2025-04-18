"use client";

import { ContactFormSchema } from "@/schemas/contact";
import { useContactUsService } from "@/services/contact-us";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

const useContactFeatures = () => {
	const { sendContactForm } = useContactUsService();

	const form = useForm<z.infer<typeof ContactFormSchema>>({
		resolver: zodResolver(ContactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phoneNumber: "",
			message: "",
		},
	});

	const { reset, formState } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;

	const handleFormSubmit = async (
		values: z.infer<typeof ContactFormSchema>,
	) => {
		try {
			await sendContactForm(values);
			toast.success("Your message has been sent!");
			reset(); // clear form
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
			if (isAxiosError(error)) {
				toast.error(error.message);
			}
		}
	};

	return { form, hasErrors, handleFormSubmit };
};

export default useContactFeatures;
