import { z } from "zod";

export const subcategoryFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name is required",
	}),

	slug: z.string().min(2, {
		message: "Slug is rqeuired",
	}),

	category: z.string().min(2, {
		message: "Category is required",
	}),

	imageUrl: z.string().url({ message: "Invalid image URL" }).optional(),
});
