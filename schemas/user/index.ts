import { isPhoneNumber } from "@/utils/helper-fns/phone";
import { z } from "zod";

export const addUserFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First Name is required!.",
	}),
	lastName: z.string().min(2, {
		message: "Last Name is required!.",
	}),
	role: z.enum(["admin", "seller", "customer"], {
		errorMap: () => ({ message: "Role is required!" }),
	}),
	email: z.string().email({
		message: "Email is required!.",
	}),
	phoneNumber: z
		.string()
		.optional()
		.refine((value) => !value || isPhoneNumber(value), {
			message: "Ivalid phone number. +998 (99) 111-22-33",
		}),
	password: z.string().min(5, {
		message: "Password is required!.",
	}),
});

export const editUserFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First Name is required!.",
	}),
	lastName: z.string().min(2, {
		message: "Last Name is required!.",
	}),
	role: z.enum(["admin", "seller", "customer"], {
		errorMap: () => ({ message: "Role is required!" }),
	}),
	email: z.string().email({
		message: "Email is required!.",
	}),
	phoneNumber: z
		.string()
		.optional()
		.refine((value) => !value || isPhoneNumber(value), {
			message: "Ivalid phone number. +998 (99) 111-22-33",
		}),
	password: z
		.string()
		.min(6, {
			message: "Password must be at least 6 characters",
		})
		.optional()
		.or(z.literal("")),
});
