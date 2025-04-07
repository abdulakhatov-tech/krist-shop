import type { ICategory } from "./category.interface";
import type { IProduct } from "./product.interface";

export interface ISubcategory {
	id: string;
	name: string;
	slug: string;
	imageUrl: string | null;
	category?: ICategory;
	products?: IProduct[];
	createdAt: string;
	updatedAt: string;
}
