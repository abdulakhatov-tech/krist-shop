import type { IProduct } from "./product.interface";

export interface IBanner {
	id: string;
	name: string;
	slug: string;
	description: string;
	imageUrl: string;
	product: IProduct;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}
