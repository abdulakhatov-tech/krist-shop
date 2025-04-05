"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { useEffect } from "react";
import { toast } from "sonner";

const useUserActionFormFeatures = () => {
	const user = useAuthUser() as IUser;

	// hooks
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	// Get query parameters
	const userId = searchParams.get("userId") as string;
	const action = userId ? "edit" : "add";

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

	const { reset, formState, setValue, watch } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;

	// Sync product data with form when fetched
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
		try {
			let payload = { ...values };

			if (userId) {
				if (
					action === "edit" &&
					(!payload.password || payload.password.trim() === "")
				) {
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

			const newParams = new URLSearchParams(searchParams.toString());
			newParams.delete("userId");
			newParams.delete("action");
			newParams.delete("action-type");
			newParams.set("role", payload.role);
			router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
			reset();
		} catch (error) {
			toast.error(`Failed to ${userId ? "edit" : "add"} user.`);
		}
	};

	return {
		form,
		action,
		hasErrors,
		handleFormSubmit,
		isUserDataLoading,
	};
};

export default useUserActionFormFeatures;
