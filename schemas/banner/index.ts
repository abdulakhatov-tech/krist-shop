import { z } from "zod";

export const bannerFormSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: "Name is required",
		})
		.max(30, {
			message: "Name must be less than 30 characters",
		}),
	slug: z.string().min(2, {
		message: "Slug is rqeuired",
	}),
	description: z
		.string()
		.min(10, {
			message: "Description is required",
		})
		.max(50, {
			message: "Description must be less than 100 characters",
		}),
	isActive: z.boolean().optional(),

	imageUrl: z.string().url({ message: "Invalid image URL" }).optional(),

	product: z.string().min(1, {
		message: "Product is required",
	}),
});
