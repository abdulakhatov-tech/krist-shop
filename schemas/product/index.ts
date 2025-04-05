import { z } from "zod";

export const productFormSchema = z
	.object({
		name: z.string().min(2, {
			message: "Name is required!.",
		}),

		slug: z.string().min(2, {
			message: "Slug is required.",
		}),

		imageUrl: z.string().url({ message: "Invalid image URL" }).optional(),

		short_description: z
			.string()
			.min(100, {
				message: "Short Description must be at least 10 characters long.",
			})
			.max(200, {
				message: "Short Description must be at most 200 characters long.",
			}),

		description: z
			.string()
			.min(200, {
				message: "Description must be at least 200 characters long.",
			})
			.max(1000, {
				message: "Short Description must be at most 1000 characters long.",
			}),

		currentPrice: z.preprocess(
			(val) => {
				if (typeof val === "string") return Number.parseFloat(val);
				return val;
			},
			z
				.number()
				.positive({ message: "Current price must be a positive number." })
				.refine((val: number) => val <= 999999, {
					message: "Current price must not exceed 999,999.",
				}),
		),

		originalPrice: z.preprocess(
			(val) => {
				if (typeof val === "string") return Number.parseFloat(val);
				return val;
			},
			z
				.number()
				.positive({ message: "Original price must be a positive number." })
				.refine((val: number) => val >= 0, {
					message: "Original price must be a positive number.",
				}),
		),

		category: z.string().min(2, { message: "Category is required." }),
		subcategory: z.string().min(2, { message: "Subcategory is required." }),
		isBestSeller: z.boolean().optional(),
		isFeatured: z.boolean().optional(),
		imageUrls: z
			.array(z.string().url({ message: "Invalid image URL" }))
			.min(4, { message: "4 image URL is required" })
			.max(4, { message: "Cannot upload more than 4 images" }),
		createdBy: z.string().nullable(),
	})
	.refine(
		(data) => {
			// Perform cross-field validation on the entire object
			return data.originalPrice >= data.currentPrice;
		},
		{
			message: "Original price must be greater than or equal to current price.",
			path: ["originalPrice"], // You can specify which field to attach the error to
		},
	);
