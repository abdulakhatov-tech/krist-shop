import { z } from "zod";

export const productStockItemSchema = z.object({
	color: z.string().min(2, { message: "Color is required!" }),
	colorText: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
		message: "Invalid hex code",
	}),
	size: z.string().min(1, { message: "Size is required!" }),
	quantity: z.coerce
		.number({ invalid_type_error: "Quantity must be a number" })
		.min(1, { message: "Minimum quantity is 1" })
		.max(10000, { message: "Maximum quantity is 10000" }),
});

export const productStockFormSchema = z.object({
	items: z.array(productStockItemSchema).min(1, {
		message: "At least one stock entry is required",
	}),
});
