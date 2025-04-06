"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
	useAddUser,
	useEditUser,
	useGetUser,
} from "@/hooks/useQueryActions/useUsers";
import type { IUser } from "@/interfaces/user.interface";
import { addUserFormSchema, editUserFormSchema } from "@/schemas/user";

const useUserActionFormFeatures = () => {
	// hooks
	const searchParams = useSearchParams();
	const user = useAuthUser() as IUser;
	const pathname = usePathname();
	const router = useRouter();

	// Get query parameters
	const userId = searchParams.get("userId") as string;
	const action = searchParams.get("action") as "edit" | "add";

	const isOpen = Boolean((userId && action === "edit") || action === "add");

	const { mutateAsync: addUser } = useAddUser();
	const { mutateAsync: editUser } = useEditUser(userId);
	const { data: userData, isLoading: isUserDataLoading } = useGetUser(userId);

	const formSchema = action === "add" ? addUserFormSchema : editUserFormSchema;

	// Form setup
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			role: "customer",
			email: "",
			phoneNumber: "",
			password: "",
		},
	});

	const { reset, formState } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;

	// Sync user data with form when fetched
	useEffect(() => {
		if (userData && !isUserDataLoading) {
			reset({
				firstName: userData.firstName || "",
				lastName: userData.lastName || "",
				role: userData.role || "",
				email: userData.email || "",
				phoneNumber: userData.phoneNumber || "",
			});
		}
	}, [userData, reset, isUserDataLoading]);

	// Handle form submission
	const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
		let payload = { ...values };

		if (userId) {
			if (action === "edit" && !payload.password?.trim()) {
				const { password, ...rest } = payload;
				payload = rest;
			}
			await editUser(payload);
		} else {
			if (!payload.phoneNumber) {
				const { phoneNumber, ...rest } = payload;
				payload = rest;
			}

			const addPayload = {
				...payload,
				createdBy: user?.id,
			} as z.infer<typeof addUserFormSchema> & { createdBy?: string };

			await addUser(addPayload);
		}

		resetFormAndRedirect(payload.role);
	};

	// Reset form and handle redirection
	const resetFormAndRedirect = (role: string) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.delete("userId");
		newParams.delete("action");
		newParams.delete("action-type");
		newParams.set("role", role);
		router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		reset();
	};

	const handleOpenChange = (state: boolean) => {
		if (!state) {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.delete("userId");
			newParams.delete("action");
			newParams.delete("action-type");
			router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		}
	};

	return {
		form,
		isOpen,
		action,
		hasErrors,
		handleOpenChange,
		handleFormSubmit,
		isUserDataLoading,
	};
};

export default useUserActionFormFeatures;
