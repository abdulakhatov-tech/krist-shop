import { current } from "@reduxjs/toolkit";
import { z } from "zod";

export const productFormSchema = z
	.object({
		name: z.string().min(2, { message: "Name is required!" }),
		slug: z.string().min(2, { message: "Slug is required" }),
		category: z.string().min(2, { message: "Category is required!" }),
		subcategory: z.string().min(2, { message: "Subcategory is required!" }),
		currentPrice: z.coerce
			.number({
				invalid_type_error: "Current price is required!",
			})
			.positive({ message: "Current price must be a positive number!" })
			.max(999999, { message: "Current price must not exceed $999,999.00" }),

		originalPrice: z.coerce
			.number({
				invalid_type_error: "Original price is required!",
			})
			.positive({ message: "Original price must be a positive number!" })
			.max(999999, { message: "Original price must not exceed $999,999.00" }),
		isBestSeller: z.boolean().optional(),
		isFeatured: z.boolean().optional(),
		short_description: z
			.string()
			.min(100, {
				message: "Short Description must be at least 100 characters long!",
			})
			.max(200, {
				message: "Short Description must be at most 200 characters long!",
			}),

		description: z
			.string()
			.min(200, {
				message: "Description must be at least 200 characters long!",
			})
			.max(1000, {
				message: "Short Description must be at most 1000 characters long!",
			}),

		imageUrl: z
			.string({
				required_error: "Thumbnail is required!",
			})
			.url({ message: "Invalid image URL" }),
		imageUrls: z
			.array(
				z
					.string()
					.url({ message: "Please provide valid URLs for all images!" }),
			)
			.min(4, { message: "A minimum of 4 image URLs is required!" })
			.max(4, { message: "You can upload no more than 4 images!" }),
	})
	.refine((data) => data.originalPrice >= data.currentPrice, {
		message: "Original price must be greater than or equal to current price!",
		path: ["originalPrice"],
	});
