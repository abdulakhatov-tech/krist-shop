"use client";

import { FormInput, FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import { userRolesOptions } from "@/utils/mock-data/user-roles";
import useUserActionFormFeatures from "./features";

const UserActionForm = () => {
	const {
		form,
		isOpen,
		action,
		hasErrors,
		handleFormSubmit,
		isUserDataLoading,
		handleOpenChange,
	} = useUserActionFormFeatures();
	const { isSubmitting, isDirty } = form.formState;

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogTitle>{action === "edit" ? "Edit" : "Add"} User</DialogTitle>

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
							getItemValue={(item) => item.id}
							getItemLabel={(item) => item.name}
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
			</DialogContent>
		</Dialog>
	);
};

export default UserActionForm;
