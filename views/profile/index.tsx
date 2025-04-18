"use client";

import { FormInput, FormUploadImage } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import useProfileFeatures from "./features";

const ProfilePageView = () => {
	const { form, hasErrors, handleFormSubmit, isLoading } = useProfileFeatures();
	const { isSubmitting, isDirty } = form.formState;

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleFormSubmit)}
					className="flex flex-col gap-4"
				>
					<h3 className="text-lg font-medium leadin-7">Edit Your Profile</h3>

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<FormInput
							form={form}
							name="firstName"
							label="First Name"
							loading={isLoading}
						/>
						<FormInput
							form={form}
							name="lastName"
							label="Last Name"
							loading={isLoading}
						/>
						<FormInput
							form={form}
							name="email"
							label="Email"
							loading={isLoading}
						/>
						<FormInput
							form={form}
							name="phoneNumber"
							label="Phone Number"
							loading={isLoading}
						/>
						<FormInput
							form={form}
							name="region"
							label="Region"
							loading={isLoading}
						/>
						<FormInput
							form={form}
							name="district"
							label="District"
							loading={isLoading}
						/>
						<FormInput
							form={form}
							name="extraAddress"
							label="Extra Address"
							loading={isLoading}
						/>
						<FormUploadImage
							form={form}
							name="profilePhoto"
							label="Profile Photo"
							loading={isLoading}
						/>
					</div>

					<h3 className="text-lg font-medium leadin-7">Password Changes</h3>

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						<FormInput form={form} name="password" label="Current Password" />
						<FormInput form={form} name="newPassword" label="New Password" />
						<FormInput
							form={form}
							name="confirmPassword"
							label="Confirm New Password"
						/>
					</div>

					{/* Button */}
					<Button
						type="submit"
						disabled={isSubmitting || !isDirty}
						className={cn(hasErrors && "button-error", "mt-4")}
					>
						{isSubmitting ? <LoadingSpinner /> : ""}{" "}
						{isSubmitting
							? "Saving Changes..."
							: isDirty
								? "Save Changes"
								: "Make changes"}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default ProfilePageView;
