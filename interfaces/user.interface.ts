import type { UserType } from "@/types/user.type";

export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string | null;
	phoneNumber: string | null;
	password: string;
	role: UserType;
	profilePhoto: string | null;
	region: string | null;
	district: string | null;
	createdBy?: {
		id: string;
		firstName: string;
		lastName: string;
		role: UserType;
	} | null;
	extraAddress: string | null;
	refreshToken: string | null;
	createdAt: string;
	updatedAt: string;
}
