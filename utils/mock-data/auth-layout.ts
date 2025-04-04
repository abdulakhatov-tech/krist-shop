export const PAGE_TITLES: Record<
	string,
	{ title: string; description: string }
> = {
	"/auth/sign-in": {
		title: "Welcome 👋",
		description: "Please login here",
	},
	"/auth/sign-up": {
		title: "Create New Account",
		description: "Please enter details",
	},
	"/auth/forgot-password": {
		title: "Forgot Password",
		description:
			"Enter your registered phone number or email address. We'll send you a code to reset your password.",
	},
	"/auth/verify-otp": {
		title: "Enter OTP",
		description: "We have sent an OTP code to your registered identifier.",
	},
	"/auth/reset-password": {
		title: "Reset Password",
		description: "Enter your new password to regain access to your account.",
	},
};
