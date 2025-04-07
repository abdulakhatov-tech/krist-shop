import type { IProduct } from "./product.interface";
import type { ISubcategory } from "./subcategory.interface";

export interface ICategory {
	id: string;
	name: string;
	slug: string;
	imageUrl: string | null;
	subcategories: ISubcategory[];
	products?: IProduct[];
	createdAt: string;
	updatedAt: string;
}
