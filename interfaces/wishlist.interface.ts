import type { IProduct } from "./product.interface";
import type { IUser } from "./user.interface";

export interface IWishlist {
	id: string;
	user: IUser;
	product: IProduct;
	createdAt: string;
	updateAt: string;
}
