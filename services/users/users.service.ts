import { type AxiosInstance, isAxiosError } from "axios";

import type { IUser } from "@/interfaces/user.interface";
import type { ResponseType } from "@/types/api";
import type { UserType } from "@/types/user.type";
import { useAxios } from "../api/axios.service";

export interface FetchUsersParams {
	page?: number;
	limit?: number;
	role?: UserType;
	search?: string;
	startDate?: string;
	endDate?: string;
}

const createUsersService = ($axios: AxiosInstance) => ({
	async fetchUsers(params: FetchUsersParams): Promise<ResponseType<IUser[]>> {
		try {
			const { data } = await $axios.get("/users", { params });
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch users");
		}
	},

	async fetchUser(userId: string): Promise<IUser> {
		try {
			const { data } = await $axios.get(`/users/${userId}`);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to fetch user.");
		}
	},

	async deleteUser(userId: string): Promise<void> {
		try {
			await $axios.delete(`/users/${userId}`);
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to delete user.");
		}
	},

	async editUserRole(userId: string, body: { role: string }): Promise<IUser> {
		try {
			const { data } = await $axios.put(`/users/role/${userId}`, body);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to edit user role.");
		}
	},
});

export const useUsersService = () => {
	const axiosInstance = useAxios();
	return createUsersService(axiosInstance);
};
