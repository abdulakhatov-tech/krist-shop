"use client";

import { FormInput, FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import { userRolesOptions } from "@/utils/mock-data/user-roles";
import useUserActionFormFeatures from "./features";

const UserActionForm = () => {
	const { form, action, hasErrors, handleFormSubmit, isUserDataLoading } =
		useUserActionFormFeatures();
	const { isSubmitting, isDirty } = form.formState;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className="flex flex-col gap-4"
			>
				{/* First Name Field */}
				<FormInput
					form={form}
					name="firstName"
					label="First Name"
					placeholder="Enter user first name"
					loading={isUserDataLoading}
				/>

				{/* Last Name Field */}
				<FormInput
					form={form}
					name="lastName"
					label="Last Name"
					placeholder="Enter user last name"
					loading={isUserDataLoading}
				/>

				{/* Role Field */}
				<FormSelect
					form={form}
					name="role"
					label="Role"
					placeholder="Select user role"
					loading={isUserDataLoading}
					items={userRolesOptions}
				/>

				{/* Email Field */}
				<FormInput
					form={form}
					name="email"
					label="Email"
					placeholder="Enter user email"
					loading={isUserDataLoading}
				/>

				{/* Phone Number Field */}
				<FormInput
					form={form}
					name="phoneNumber"
					label="Phone Number"
					placeholder="Enter user phone number"
					loading={isUserDataLoading}
				/>

				{/* Password Field */}
				{action === "add" && (
					<FormInput
						form={form}
						type="password"
						name="password"
						label="Password"
						placeholder="Enter user password"
						loading={isUserDataLoading}
					/>
				)}

				{/* Button */}
				<Button
					type="submit"
					size="lg"
					disabled={isSubmitting || !isDirty}
					className={cn(hasErrors && "button-error", "mt-4")}
				>
					{isSubmitting ? <LoadingSpinner /> : ""}{" "}
					{isSubmitting
						? action === "add"
							? "Adding New User..."
							: "Editing User"
						: action === "add"
							? "Add User"
							: "Edit User"}
				</Button>
			</form>
		</Form>
	);
};

export default UserActionForm;
