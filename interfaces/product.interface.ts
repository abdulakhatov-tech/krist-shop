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
	// category?: ICategoryItem;
	// subcategory?: ISubCategoryItem;
	isBestSeller: boolean;
	isFeatured: boolean;
	// flashSaleItems: any[];
	// bestSellingItems: any[];
	// createdBy?: IUser;
	// colors: IColor[];
	// sizes: ISize[];
	// stock: IStock[];
	createdAt: Date;
	updatedAt: Date;
}
