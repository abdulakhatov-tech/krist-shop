import { z } from "zod";

export const categoryFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters long.",
	}),

	slug: z.string().min(2, {
		message: "Slug must be at least 2 characters long.",
	}),

	imageUrl: z.string().url({ message: "Invalid image URL" }).optional(),
});
