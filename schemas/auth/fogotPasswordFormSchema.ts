import { isEmail } from "@/utils/helper-fns/email";
import { isPhoneNumber } from "@/utils/helper-fns/phone";
import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
	identifier: z
		.string()
		.refine((value) => isPhoneNumber(value) || isEmail(value), {
			message: "Please enter a valid phone number or email address.",
		}),
});
