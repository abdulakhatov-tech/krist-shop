"use client";

import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
	useEditUserProfile,
	useGetUser,
} from "@/hooks/useQueryActions/useUsers";
import type { IUser } from "@/interfaces/user.interface";
import { profileFormSchema } from "@/schemas/profile";
import type { IUserProfileInfoBody } from "@/services/users/users.service";
import { zodResolver } from "@hookform/resolvers/zod";

const useProfileFeatures = () => {
	const user = useAuthUser() as IUser;

	const { data, isLoading } = useGetUser(user?.id);
	const { mutateAsync: editUserInfo } = useEditUserProfile(user?.id);

	const form = useForm<z.infer<typeof profileFormSchema>>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			region: "",
			district: "",
			extraAddress: "",
			profilePhoto: "",
			password: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const { reset, formState } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;

	useEffect(() => {
		if (user && !isLoading) {
			reset({
				firstName: data?.firstName ?? "",
				lastName: data?.lastName ?? "",
				email: data?.email ?? "",
				phoneNumber: data?.phoneNumber ?? "",
				region: data?.region ?? "",
				district: data?.district ?? "",
				extraAddress: data?.extraAddress ?? "",
				profilePhoto: data?.profilePhoto ?? "",
			});
		}
	}, [user, isLoading, data, reset]);

	const handleFormSubmit = async (
		values: z.infer<typeof profileFormSchema>,
	) => {
		if (!user) return;

		const payload: IUserProfileInfoBody = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			phoneNumber: values.phoneNumber,
			region: values.region,
			district: values.district,
			extraAddress: values.extraAddress,
			profilePhoto: values.profilePhoto,
		};

		if (values.password && values.newPassword) {
			payload.password = values.password;
			payload.newPassword = values.newPassword;
		}

		await editUserInfo(payload);
	};

	return { form, hasErrors, handleFormSubmit, isLoading };
};

export default useProfileFeatures;
