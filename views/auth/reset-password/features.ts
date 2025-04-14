"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { useAppDispatch } from "@/hooks/useRedux";
import { setResetPasswordModalVisibility } from "@/redux/slices/modals/resetPasswordSuccessModalSlice";
import { resetPasswordFormSchema } from "@/schemas/auth/resetPasswordFormSchema";
import { useAuthService } from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";

const useResetPasswordPageViewFeatures = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { resetPassword } = useAuthService();

	const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
		resolver: zodResolver(resetPasswordFormSchema),
		defaultValues: {
			newPassword: "",
		},
	});

	const { reset, formState } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;

	const handleFormSubmit = async (
		values: z.infer<typeof resetPasswordFormSchema>,
	) => {
		try {
			let identifier: string | null = null;
			if (typeof window !== "undefined") {
				identifier = localStorage.getItem("identifier");
			}
			if (!identifier) {
				if (typeof window !== "undefined") {
					localStorage.removeItem("identifier");
				}
				router.push("/auth/forgot-password");
				return;
			}

			const { success, message } = await resetPassword({
				newPassword: values.newPassword,
				identifier,
			});

			if (success) {
				toast(message || "New Password reset successfull!");

				dispatch(setResetPasswordModalVisibility(true));
				reset();
			}

			if (typeof window !== "undefined") {
				localStorage.removeItem("identifier");
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

export default useResetPasswordPageViewFeatures;
