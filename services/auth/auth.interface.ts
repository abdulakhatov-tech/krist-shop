import type { IUser } from "@/interfaces/user.interface";

export interface ISignUpPayload {
	firstName: string;
	lastName: string;
	identifier: string;
	password: string;
}

export interface ISignInPayload {
	identifier: string;
	password: string;
	rememberMe?: boolean | undefined;
}

export interface IForgotPasswordPayload {
	identifier: string;
}

export interface IVerifyOTPPayload {
	otpCode: string;
	identifier: string;
}

export interface IResetPasswordPayload {
	newPassword: string;
	identifier: string;
}

export interface IAuthResponse {
	success: boolean;
	message: string;
	data?: {
		accessToken: string;
		refreshToken: string;
		user: IUser; // Replace with your user type
	};
}

export interface IForgotPasswordResponse {
	success: boolean;
	message: string;
	data: {
		otpCode: string;
		expiresIn: number;
	};
}

export interface IVerifyOTPResponse {
	success: boolean;
	message: string;
}

export interface IResetPasswordResponse {
	success: boolean;
	message: string;
}
