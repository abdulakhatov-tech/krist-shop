import type { ICategory } from "./category.interface";

export interface ISubcategory {
	id: string;
	name: string;
	slug: string;
	imageUrl: string | null;
	category?: ICategory;
}
