import type { IProduct } from "./product.interface";
import type { IUser } from "./user.interface";

export interface ICart {
	id: string;
	user: IUser;
	product: IProduct;
	quantity: number;
	createdAt: string;
	updateAt: string;
}
