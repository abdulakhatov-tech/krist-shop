import type { UserType } from "@/types/user.type";
import type { ISize } from "./size.interface";

export interface IProduct {
	id: string;
	name: string;
	short_description: string;
	description?: string | null;
	slug: string;
	currentPrice: number;
	originalPrice?: number | null;
	rating: number;
	reviewCount: number;
	imageUrl: string;
	imageUrls: string[];
	category?: {
		id: string;
		name: string;
		slug: string;
	};
	subcategory?: {
		id: string;
		name: string;
		slug: string;
	};
	isBestSeller: boolean;
	isFeatured: boolean;
	// flashSaleItems: any[];
	// bestSellingItems: any[];
	createdBy?: {
		id: string;
		firstName: string;
		lastName: string;
		role: UserType;
	} | null;
	colors: {
		id: string;
		name: string;
		hexCode: string;
	}[];
	sizes: Pick<ISize, "id" & "name">[];
	stock: {
		id: string;
		quantity: number;
	}[];
	createdAt: string;
	updatedAt: string;
}
