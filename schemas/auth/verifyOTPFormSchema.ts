import { z } from "zod";

export const verifyOTPFormSchema = z.object({
	otpCode: z.string().regex(/^\d{6}$/, {
		message: "OTP Code must be exactly 6 digits.",
	}),
});
