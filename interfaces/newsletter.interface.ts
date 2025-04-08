import type { IUser } from "./user.interface";

export interface INewsletter {
	id: string;
	email: string;
	user: IUser;
	createdAt: string;
	updatedAt: string;
}
