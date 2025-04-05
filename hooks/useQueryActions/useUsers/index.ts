import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { IUser } from "@/interfaces/user.interface";
import {
	type FetchUsersParams,
	useUsersService,
} from "@/services/users/users.service";
import { handleApiError } from "@/utils/helper-fns/errors";

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
