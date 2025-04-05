import type { ISubcategory } from "./subcategory.interface";

export interface ICategory {
	id: string;
	name: string;
	slug: string;
	image_url: string | null;
	subcategories: ISubcategory[];
}
