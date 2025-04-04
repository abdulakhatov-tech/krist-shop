import { z } from "zod";

import { isEmail } from "@/utils/helper-fns/email";
import { isPhoneNumber } from "@/utils/helper-fns/phone";

export const signUpFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters long.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters long.",
	}),
	identifier: z
		.string()
		.refine((value) => isPhoneNumber(value) || isEmail(value), {
			message: "Please enter a valid phone number or email address.",
		}),
	password: z.string().min(5, "Password must be at least 5 characters long."),
	isAgree: z.boolean().refine((val) => val, {
		message: "Please accept the terms and conditions.",
	}),
});
