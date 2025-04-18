import { z } from "zod";

import { isEmail } from "@/utils/helper-fns/email";
import { isPhoneNumber } from "@/utils/helper-fns/phone";

export const ContactFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name is required!",
	}),
	email: z
		.string()
		.min(2, {
			message: "Email is required!",
		})
		.refine((value) => isEmail(value), {
			message: "Invalid email",
		}),
	phoneNumber: z
		.string()
		.min(2, {
			message: "Phone Number is required!",
		})
		.refine((value) => isPhoneNumber(value), {
			message: "Invalid phone Number +998991112233",
		}),
	message: z.string().min(5, "Message must be at least 5 characters long!"),
});
