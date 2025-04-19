"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

	const [identifier, setIdentifier] = useState<string | null>(null);

	useEffect(() => {
		const id = localStorage.getItem("identifier");
		if (!id) {
			localStorage.removeItem("identifier");
			router.push("/auth/forgot-password");
		} else {
			setIdentifier(id);
		}
	}, [router]);

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
			if (!identifier) {
				toast.error("No identifier found. Please try again.");
				router.push("/auth/forgot-password");
				return;
			}

			const { success, message } = await resetPassword({
				newPassword: values.newPassword,
				identifier,
			});

			if (success) {
				toast(message || "New Password reset successful!");

				dispatch(setResetPasswordModalVisibility(true));
				reset();

				localStorage.removeItem("identifier");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorMessage = error.response?.data?.message;
				toast.error(errorMessage || "Failed to reset password!");
			}
		}
	};

	return { form, hasErrors, handleFormSubmit };
};

export default useResetPasswordPageViewFeatures;
