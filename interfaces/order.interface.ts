import type { IProduct } from "@/interfaces/product.interface";
import type { IUser } from "@/interfaces/user.interface";

export interface IOrderProduct {
	id: string;
	order: Pick<IOrder, "id">;
	product: IProduct;
	price: number;
	quantity: number;
}

export interface IOrder {
	id: string;
	user: IUser;
	products: IOrderProduct[];
	delivery_method: "pickup" | "courier" | "postal";
	payment_method: "cash" | "click" | "payme";
	region: string;
	district: string;
	extraAddress: string;
	shipping: number;
	coupon: number;
	price: number;
	status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
	createdAt: string; // ISO Date string
	updatedAt: string; // ISO Date string
}
