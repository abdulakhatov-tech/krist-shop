import { z } from "zod";

export const couponFormSchema = z.object({
	code: z
		.string()
		.min(1, {
			message: "Code is required!",
		})
		.max(10, {
			message: "Code can be less than 10 characters",
		}),
});
