import { z } from "zod";

export const resetPasswordFormSchema = z.object({
	newPassword: z
		.string()
		.min(5, "Password must be at least 5 characters long."),
});
