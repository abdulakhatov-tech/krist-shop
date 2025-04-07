"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

import { FormInput, FormUploadImage } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import useCategoryFormFeatures from "./features";

const CategoryFormModal: React.FC = () => {
	const pathname = usePathname();
	const {
		form,
		isOpen,
		action,
		hasErrors,
		handleOpenChange,
		handleFormSubmit,
		handleNameChange,
		isCategoryLoading,
	} = useCategoryFormFeatures();
	const { isSubmitting, isDirty } = form.formState;

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogTitle>{action === "edit" ? "Edit" : "Add"} Category</DialogTitle>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className="flex flex-col gap-4"
					>
						{/* Name Field */}
						<FormInput
							form={form}
							name="name"
							label="Enter category name"
							onChange={(e) => handleNameChange(e.target.value)}
							loading={isCategoryLoading}
						/>

						{/* Slug Field */}
						<FormInput
							form={form}
							name="slug"
							label="Enter category slug"
							loading={isCategoryLoading}
						/>

						{/* Image Field */}
						<FormUploadImage
							form={form}
							name="imageUrl"
							label="Upload category image"
							loading={isCategoryLoading}
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
									? "Adding new Category..."
									: "Editing Category"
								: action === "add"
									? "Add Category"
									: "Edit Category"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CategoryFormModal;
