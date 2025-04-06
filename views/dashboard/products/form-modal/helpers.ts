import type { productFormSchema } from "@/schemas/product";
import type { z } from "zod";

export const defaultFormValues: z.infer<typeof productFormSchema> = {
	name: "",
	slug: "",
	category: "",
	subcategory: "",
	currentPrice: 0,
	originalPrice: 0,
	isBestSeller: false,
	isFeatured: false,
	short_description: "",
	description: "",
	imageUrl: "",
	imageUrls: [],
};
