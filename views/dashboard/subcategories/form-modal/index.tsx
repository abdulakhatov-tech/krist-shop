"use client";

import type React from "react";

import { FormInput, FormSelect, FormUploadImage } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import useSubcategoryFormFeatures from "./features";

const SubcategoryFormModal: React.FC = () => {
	const {
		form,
		isOpen,
		action,
		hasErrors,
		handleOpenChange,
		handleFormSubmit,
		handleNameChange,
		isSubcategoryLoading,
		category,
		isCategoryLoading,
	} = useSubcategoryFormFeatures();
	const { isSubmitting, isDirty } = form.formState;

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogTitle>
					{action === "edit" ? "Edit" : "Add"} Subategory
				</DialogTitle>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className="flex flex-col gap-4"
					>
						{/* Name Field */}
						<FormInput
							form={form}
							name="name"
							label="Enter subcategory name"
							onChange={(e) => handleNameChange(e.target.value)}
							loading={isSubcategoryLoading}
						/>

						{/* Slug Field */}
						<FormInput
							form={form}
							name="slug"
							label="Enter subcategory slug"
							loading={isSubcategoryLoading}
						/>

						{/* Category Field */}
						<FormSelect
							form={form}
							name="category"
							label="Select a category"
							items={
								category?.map((item) => ({ name: item.name, id: item.id })) ||
								[]
							}
							loading={isSubcategoryLoading || isCategoryLoading}
						/>

						{/* Image Field */}
						<FormUploadImage
							form={form}
							name="imageUrl"
							label="Upload subcategory image"
							loading={isSubcategoryLoading}
						/>

						{/* Button */}
						<Button
							type="submit"
							disabled={isSubmitting || !isDirty}
							className={cn(hasErrors && "button-error", "mt-4")}
						>
							{isSubmitting ? <LoadingSpinner /> : ""}{" "}
							{isSubmitting
								? action === "add"
									? "Adding new Subcategory..."
									: "Editing Subcategory"
								: action === "add"
									? "Add Subcategory"
									: "Edit Subcategory"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default SubcategoryFormModal;
