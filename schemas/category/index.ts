import { z } from "zod";

export const categoryFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name is required",
	}),

	slug: z.string().min(2, {
		message: "Slug is rqeuired",
	}),

	imageUrl: z.string().url({ message: "Invalid image URL" }).optional(),
});
