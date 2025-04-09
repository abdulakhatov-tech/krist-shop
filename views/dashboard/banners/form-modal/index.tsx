"use client";

import {
	FormCheckbox,
	FormInput,
	FormSelect,
	FormTextarea,
	FormUploadImage,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import useBannerFormModalFeatures from "./features";

const BannerFormModal = () => {
	const {
		form,
		action,
		isOpen,
		hasErrors,
		isBannerLoading,
		handleOpenChange,
		handleFormSubmit,
		handleNameChange,
		isProductsDataLoading,
		productsData,
	} = useBannerFormModalFeatures();
	const { isSubmitting } = form.formState;

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="md:min-w-[700px]">
				<DialogTitle>{action === "edit" ? "Edit" : "Add"} Banner</DialogTitle>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className="flex flex-col gap-4"
					>
						<div className="grid md:grid-cols-2 gap-4">
							{/* Name Field */}
							<FormInput
								form={form}
								name="name"
								label="Enter banner Title"
								onChange={(e) => handleNameChange(e.target.value)}
								loading={isBannerLoading}
							/>

							{/* Slug Field */}
							<FormInput
								form={form}
								name="slug"
								label="Enter banner slug"
								loading={isBannerLoading}
							/>
						</div>
						{/* Description Field */}
						<FormTextarea
							form={form}
							name="description"
							label="Enter banner description"
							loading={isBannerLoading}
						/>
						<div className="grid grid-cols-[1fr_auto] gap-4 items-start">
							<FormSelect
								form={form}
								name="product"
								label="Select product"
								loading={isProductsDataLoading}
								items={
									productsData?.map((item) => ({
										id: item.id,
										name: item.name,
									})) || []
								}
							/>
							<FormCheckbox
								form={form}
								name="isActive"
								label="Is Active"
								loading={isBannerLoading}
							/>
						</div>

						{/* Image Field */}
						<FormUploadImage
							form={form}
							name="imageUrl"
							label="Upload banner image"
							loading={isBannerLoading}
						/>

						{/* Button */}
						<Button
							type="submit"
							disabled={isSubmitting}
							className={cn(hasErrors && "button-error", "mt-4")}
						>
							{isSubmitting ? <LoadingSpinner /> : ""}{" "}
							{isSubmitting
								? action === "add"
									? "Adding new Banner..."
									: "Editing Banner"
								: action === "add"
									? "Add Banner"
									: "Edit Banner"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default BannerFormModal;
