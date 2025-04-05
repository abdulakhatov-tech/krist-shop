import type { ICategory } from "./category.interface";

export interface ISubcategory {
	id: string;
	name: string;
	slug: string;
	image_url: string | null;
	category?: ICategory;
}
