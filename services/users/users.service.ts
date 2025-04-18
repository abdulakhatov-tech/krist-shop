import { type AxiosInstance, isAxiosError } from "axios";

import type { IUser } from "@/interfaces/user.interface";
import type { addUserFormSchema, editUserFormSchema } from "@/schemas/user";
import type { ResponseType } from "@/types/api";
import type { UserType } from "@/types/user.type";
import type { z } from "zod";
import { useAxios } from "../api/axios.service";

export interface FetchUsersParams {
	page?: number;
	limit?: number;
	role?: UserType;
	search?: string;
	startDate?: string;
	endDate?: string;
}

export interface IUserOrderInfoBody {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	region: string;
	district: string;
	extraAddress: string;
}

export interface IUserProfileInfoBody {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	region: string;
	district: string;
	extraAddress: string;
	profilePhoto?: string;
	password?: string;
	newPassword?: string;
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

	async addUser(
		body: z.infer<typeof addUserFormSchema> & { createdBy?: string },
	): Promise<IUser> {
		try {
			const { data } = await $axios.post("/users", body);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to add user.");
		}
	},

	async editUser(
		userId: string,
		body: z.infer<typeof editUserFormSchema>,
	): Promise<IUser> {
		try {
			const { data } = await $axios.patch(`/users/${userId}`, body);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to edit user.");
		}
	},

	async editUserOrderInfo(
		userId: string,
		body: IUserOrderInfoBody,
	): Promise<IUser> {
		try {
			const { data } = await $axios.patch(`/users/${userId}/order-info`, body);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to edit user order info.");
		}
	},

	async editUserProfile(
		userId: string,
		body: IUserProfileInfoBody,
	): Promise<IUser> {
		try {
			const { data } = await $axios.patch(
				`/users/${userId}/profile-info`,
				body,
			);
			return data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error?.response?.data?.message);
			}
			throw new Error("Failed to edit user profile info.");
		}
	},
});

export const useUsersService = () => {
	const axiosInstance = useAxios();
	return createUsersService(axiosInstance);
};
