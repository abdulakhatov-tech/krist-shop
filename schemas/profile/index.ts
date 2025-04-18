import { isEmail } from "@/utils/helper-fns/email";
import { isPhoneNumber } from "@/utils/helper-fns/phone";
import { z } from "zod";

export const profileFormSchema = z
	.object({
		firstName: z.string().min(2, {
			message: "First Name is required",
		}),

		lastName: z.string().min(2, {
			message: "Last Name is required",
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

		region: z.string().min(2, {
			message: "Region is required",
		}),

		district: z.string().min(2, {
			message: "District is required",
		}),

		extraAddress: z.string().min(2, {
			message: "Extra Address is required",
		}),

		password: z.string().optional(),

		newPassword: z.string().optional(),

		confirmPassword: z.string().optional(),

		profilePhoto: z.string().url({ message: "Invalid image URL" }).optional(),
	})
	.refine(
		(data) => {
			if (data.newPassword || data.confirmPassword) {
				return data.newPassword === data.confirmPassword;
			}
			return true;
		},
		{
			path: ["confirmPassword"],
			message: "New password and confirm password must match",
		},
	);
