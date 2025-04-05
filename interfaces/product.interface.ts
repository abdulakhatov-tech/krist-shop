import type { UserType } from "@/types/user.type";

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
	// colors: IColor[];
	// sizes: ISize[];
	// stock: IStock[];
	createdAt: string;
	updatedAt: string;
}
