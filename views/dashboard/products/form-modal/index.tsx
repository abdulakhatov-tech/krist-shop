"use client";

import {
	FormCheckbox,
	FormInput,
	FormMultiUploadImages,
	FormSelect,
	FormTextarea,
	FormUploadImage,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import useProductActionFormModalFeatures from "./features";

const ProductActionFormModal = () => {
	const {
		form,
		isOpen,
		action,
		hasErrors,
		handleOpenChange,
		handleFormSubmit,
		handleNameChange,
		isProductDataLoading,
		categoryData,
		isCategoryDataLoading,
		subcategoryData,
		selectedCategory,
		isSubcategoryDataLoading,
	} = useProductActionFormModalFeatures();
	const { isSubmitting, isDirty } = form.formState;

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="md:min-w-[700px] lg:min-w-[900px] xl:min-w-[1050px] 2xl:min-w-[1200px]">
				<DialogTitle>{action === "edit" ? "Edit" : "Add"} Product</DialogTitle>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className="flex flex-col gap-4 max-h-[82vh] overflow-y-scroll px-[2px]"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{/* Name Field */}
							<FormInput
								form={form}
								name="name"
								label="Name"
								placeholder="Enter product name"
								loading={isProductDataLoading}
								onChange={(e) => handleNameChange(e.target.value)}
							/>

							{/* Slug Field */}
							<FormInput
								form={form}
								name="slug"
								label="Slug"
								placeholder="Enter product slug"
								loading={isProductDataLoading}
							/>

							{/* Category Field */}
							<FormSelect
								form={form}
								name="category"
								label="Category"
								placeholder="Select a Category"
								loading={isProductDataLoading || isCategoryDataLoading}
								items={categoryData || []}
							/>

							{/* Subcategory Field */}
							<FormSelect
								form={form}
								name="subcategory"
								label="Subcategory"
								placeholder={
									selectedCategory
										? "Select a Subcategory"
										: "First select a category"
								}
								loading={
									isProductDataLoading ||
									isCategoryDataLoading ||
									isSubcategoryDataLoading
								}
								items={subcategoryData || []}
								disabled={!selectedCategory}
							/>

							{/* Current Price Field */}
							<FormInput
								form={form}
								type="number"
								name="currentPrice"
								label="Current Price"
								placeholder="Enter current price"
								loading={isProductDataLoading}
							/>

							{/* Original Price Field */}
							<FormInput
								form={form}
								type="number"
								name="originalPrice"
								label="Original Price"
								placeholder="Enter original price"
								loading={isProductDataLoading}
							/>

							{/* Is Bestseller Field */}
							<FormCheckbox
								form={form}
								label="Is Bestseller ?"
								name="isBestSeller"
								loading={isProductDataLoading}
							/>

							{/* Is Featured Field */}
							<FormCheckbox
								form={form}
								label="Is Featured ?"
								name="isFeatured"
								loading={isProductDataLoading}
							/>
						</div>

						{/* Short Description Field */}
						<FormTextarea
							form={form}
							name="short_description"
							label="Short Description"
							placeholder="Enter short description"
							loading={isProductDataLoading}
							rows={2}
						/>

						{/* Description Field */}
						<FormTextarea
							form={form}
							name="description"
							label="Description"
							placeholder="Enter description"
							loading={isProductDataLoading}
							rows={14}
						/>

						<div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-start gap-4 md:gap-8">
							<FormUploadImage
								form={form}
								name="imageUrl"
								label="Thumbnail"
								loading={isProductDataLoading}
							/>

							<FormMultiUploadImages
								form={form}
								name="imageUrls"
								label="Additional Images"
								loading={isProductDataLoading}
							/>
						</div>

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
									? "Adding New Product..."
									: "Editing Product"
								: action === "add"
									? "Add Product"
									: "Edit Product"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ProductActionFormModal;
