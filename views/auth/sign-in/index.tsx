"use client";

import Link from "next/link";

import { FormCheckbox, FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import useSignInPageViewFeatures from "./features";

const SignInPageView = () => {
	const { form, hasErrors, handleFormSubmit } = useSignInPageViewFeatures();
	const { isSubmitting } = form.formState;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className="flex flex-col gap-4"
			>
				{/* Identifier Field */}
				<FormInput
					form={form}
					name="identifier"
					label="Phone Number or Email"
				/>

				{/* Password Field */}
				<FormInput
					form={form}
					name="password"
					type="password"
					label="Password"
				/>

				<div className="flex items-center justify-between flex-wrap gap-4">
					{/* RememberMe Field */}
					<FormCheckbox form={form} name="rememberMe" label="Remember Me" />

					{/* Forgot Password */}
					<Link
						href="/forgot-password"
						className="hover:text-blue-500 hover:underline"
					>
						Forgot Password ?
					</Link>
				</div>

				{/* Button */}
				<Button
					type="submit"
					disabled={isSubmitting}
					className={cn(hasErrors && "button-error", "mt-4")}
				>
					{isSubmitting ? <LoadingSpinner /> : ""}{" "}
					{isSubmitting ? "Signing In..." : "Sign In"}
				</Button>
			</form>
		</Form>
	);
};

export default SignInPageView;
