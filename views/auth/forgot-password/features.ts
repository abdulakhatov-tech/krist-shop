"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { forgotPasswordFormSchema } from "@/schemas/auth/fogotPasswordFormSchema";
import { useAuthService } from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const useForgotPasswordPageViewFeatures = () => {
	const router = useRouter();
	const { forgotPassword } = useAuthService();

	// State to check when we can access localStorage safely
	const [isClient, setIsClient] = useState(false);
	// Set isClient to true after the component is mounted
	useEffect(() => {
		setIsClient(true);
	}, []);

	const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
		resolver: zodResolver(forgotPasswordFormSchema),
		defaultValues: {
			identifier: "",
		},
	});

	const { reset, formState } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;

	const handleFormSubmit = async (
		values: z.infer<typeof forgotPasswordFormSchema>,
	) => {
		try {
			const { success, message, data } = await forgotPassword(values);

			if (success) {
				toast(message || "Sent you one-time OTP code!");

				if (isClient) {
					// Store data in localStorage (after navigation)
					localStorage.setItem("otp_code", JSON.stringify(data));
					localStorage.setItem("identifier", values.identifier);
				}

				// Navigate before resetting form to avoid delay
				router.replace("/auth/verify-otp");

				// Reset the form after navigation
				reset();
			} else {
				toast("Failed to send OTP code!");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorMessage = error.response?.data?.message;
				toast(errorMessage || "Failed to send OTP code!");
			}
		}
	};

	return { form, hasErrors, handleFormSubmit };
};

export default useForgotPasswordPageViewFeatures;
