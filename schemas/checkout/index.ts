import { isPhoneNumber } from "@/utils/helper-fns/phone";
import { z } from "zod";

export const checkoutFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First Name is required!.",
	}),
	lastName: z.string().min(2, {
		message: "Last Name is required!.",
	}),
	email: z.string().email({
		message: "Email is required!.",
	}),
	phoneNumber: z
		.string()
		.min(1, {
			message: "Phone Number is required!.",
		})
		.refine((value) => !value || isPhoneNumber(value), {
			message: "Ivalid phone number. +998 (99) 111-22-33",
		}),

	region: z.string().min(2, {
		message: "Region is required!.",
	}),
	district: z.string().min(2, {
		message: "District is required!.",
	}),
	extraAddress: z.string().min(2, {
		message: "Extra Address is required!.",
	}),
	delivery: z.enum(["pickup", "courier", "postal"], {
		message: "Delivery method is required!.",
	}),
	payment: z.enum(["cash", "payme", "click"], {
		message: "Payment method is required!.",
	}),
	saveInfo: z.boolean().optional(),
});
