import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

import type { IUser } from "@/interfaces/user.interface";
import { profileFormSchema } from "@/schemas/profile";
import type { addUserFormSchema, editUserFormSchema } from "@/schemas/user";
import {
	type FetchUsersParams,
	type IUserOrderInfoBody,
	type IUserProfileInfoBody,
	useUsersService,
} from "@/services/users/users.service";
import { handleApiError } from "@/utils/helper-fns/errors";
import type { z } from "zod";

type AddUserFormData = z.infer<typeof addUserFormSchema>;
type EditUserFormData = z.infer<typeof editUserFormSchema>;

export const useUsers = (params: FetchUsersParams = {}) => {
	const { fetchUsers } = useUsersService();

	return useQuery({
		queryKey: ["users", params],
		queryFn: () => fetchUsers(params),
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useGetUser = (userId: string) => {
	const { fetchUser } = useUsersService();

	return useQuery({
		queryKey: ["users", userId],
		queryFn: () => fetchUser(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	const { deleteUser } = useUsersService();

	return useMutation({
		mutationFn: async (userId: string) => {
			await deleteUser(userId);
			return userId;
		},
		onSuccess: () => {
			toast.success("User deleted successfully!");
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		},
		onError: handleApiError,
	});
};

export const useEditUserRole = (userId: string) => {
	const queryClient = useQueryClient();
	const { editUserRole } = useUsersService();

	return useMutation({
		mutationFn: (data: { role: string }) => editUserRole(userId, data),
		onSuccess: (user: IUser) => {
			toast.success("User role edited successfully!");

			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
			queryClient.invalidateQueries({ queryKey: ["users", user?.id] });
		},
		onError: handleApiError,
	});
};

export const useAddUser = () => {
	const queryClient = useQueryClient();
	const { addUser } = useUsersService();

	return useMutation({
		mutationFn: (data: AddUserFormData & { createdBy?: string }) =>
			addUser(data),
		onSuccess: () => {
			toast.success("User added successfully!");
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: handleApiError,
	});
};

export const useEditUser = (userId: string) => {
	const queryClient = useQueryClient();
	const { editUser } = useUsersService();

	return useMutation({
		mutationFn: (data: EditUserFormData) => editUser(userId, data),
		onSuccess: () => {
			toast.success("User edited successfully!");
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["users", userId] });
		},
		onError: handleApiError,
	});
};

export const useEditUserOrderInfo = (userId: string) => {
	const queryClient = useQueryClient();
	const { editUserOrderInfo } = useUsersService();

	return useMutation({
		mutationFn: (data: IUserOrderInfoBody) => editUserOrderInfo(userId, data),
		onSuccess: (data: IUser) => {
			toast.success("User Order Info edited successfully!");

			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["users", data?.id] });

			const existingCookie = Cookies.get("_auth_state");
			if (existingCookie) {
				const parsed = JSON.parse(existingCookie);

				const updated = {
					...parsed,
					...data,
				};

				Cookies.set("_auth_state", JSON.stringify(updated), {});
			}
		},
		onError: handleApiError,
	});
};

export const useEditUserProfile = (userId: string) => {
	const queryClient = useQueryClient();
	const { editUserProfile } = useUsersService();

	return useMutation({
		mutationFn: (data: IUserProfileInfoBody) => editUserProfile(userId, data),
		onSuccess: (data: IUser) => {
			toast.success("User Profile Info edited successfully!");

			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["users", data?.id] });
		},
		onError: handleApiError,
	});
};
