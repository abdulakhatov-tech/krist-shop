import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { signUpFormSchema } from "@/schemas/auth/signUpFormSchema";
import { useAuthService } from "@/services/auth/auth.service";
import {
	type ApiErrorResponse,
	getErrorMessage,
	handleFormErrors,
} from "@/utils/helper-fns/extractErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";

const useSignUpFeatures = () => {
	const signIn = useSignIn();
	const router = useRouter();
	const { signUp } = useAuthService();

	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			identifier: "",
			password: "",
			isAgree: false,
		},
	});

	const { reset, formState, setError } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;
	const handleFormSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
		try {
			const { success, message, data } = await signUp({
				firstName: values.firstName,
				lastName: values.lastName,
				identifier: values.identifier,
				password: values.password,
			});

			if (success && data?.accessToken) {
				const { accessToken, user } = data;

				const signedIn = signIn({
					auth: {
						token: accessToken,
						type: "Bearer",
					},
					userState: user,
				});

				if (signedIn) {
					toast(message || "Account created successfully!");
					reset();
					router.push("/");
				} else {
					toast("Failed to sign up!");
				}
			} else {
				toast.error(message || "Registration failed");
			}
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				const errorResponse = error.response?.data as
					| ApiErrorResponse
					| undefined;
				toast.error(getErrorMessage(errorResponse));

				if (errorResponse?.errors) {
					handleFormErrors<typeof values>(errorResponse.errors, setError);
				}
			} else {
				toast.error(getErrorMessage(error));
			}
		}
	};

	return { form, hasErrors, handleFormSubmit };
};

export default useSignUpFeatures;
