"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { forgotPasswordFormSchema } from "@/schemas/auth/fogotPasswordFormSchema";
import { useAuthService } from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";

const useForgotPasswordPageViewFeatures = () => {
	const router = useRouter();
	const { forgotPassword } = useAuthService();

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
				toast(message || "Send you one-time OTP code!");
				localStorage.setItem("otp_code", JSON.stringify(data));

				localStorage.setItem("identifier", values.identifier);
				reset();
				router.push("/auth/verify-otp");
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
