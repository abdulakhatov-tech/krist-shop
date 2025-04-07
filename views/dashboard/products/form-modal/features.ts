"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { useCategories } from "@/hooks/useQueryActions/useCategories";
import {
	useAddProduct,
	useEditProduct,
	useGetProduct,
} from "@/hooks/useQueryActions/useProducts";
import { useSubCategoriesByCategoryId } from "@/hooks/useQueryActions/useSubcategories";
import type { IUser } from "@/interfaces/user.interface";
import { productFormSchema } from "@/schemas/product";
import { handleTextToSlug } from "@/utils/helper-fns/slug";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultFormValues } from "./helpers";

const useProductActionFormModalFeatures = () => {
	// hooks
	const searchParams = useSearchParams();
	const user = useAuthUser() as IUser;
	const pathname = usePathname();
	const router = useRouter();

	// Get query parameters
	const productId = searchParams.get("productId") || "";
	const action = searchParams.get("action") as "edit" | "add" | null;

	const isOpen = !!((productId && action === "edit") || action === "add");
	const [selectedCategory, setSelectedCategory] = useState("");

	const { mutateAsync: addProduct } = useAddProduct();
	const { mutateAsync: editProduct } = useEditProduct(productId);
	const { data: productData, isLoading: isProductDataLoading } =
		useGetProduct(productId);
	const { data: categoryData, isLoading: isCategoryDataLoading } =
		useCategories();
	const { data: subcategoryData, isLoading: isSubcategoryDataLoading } =
		useSubCategoriesByCategoryId(selectedCategory, {
			enabled: !!selectedCategory, // only fetch when selected
		});

	// Form setup
	const form = useForm<z.infer<typeof productFormSchema>>({
		resolver: zodResolver(productFormSchema),
		defaultValues: defaultFormValues,
	});

	const { reset, setValue, watch, formState } = form;
	const hasErrors = !!Object.keys(formState.errors).length;

	// Sync category selection
	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "category" && value.category)
				setSelectedCategory(value.category || "");
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	// Sync selectedCategory from productData
	useEffect(() => {
		if (productData && !isProductDataLoading) {
			setSelectedCategory(productData?.category?.id ?? "");
		}
	}, [productData, isProductDataLoading]);

	// Prefill form in edit mode
	useEffect(() => {
		if (
			productData &&
			selectedCategory &&
			!isSubcategoryDataLoading &&
			subcategoryData?.length
		) {
			reset({
				name: productData.name ?? "",
				slug: productData.slug ?? "",
				category: productData?.category?.id ?? "",
				subcategory: productData?.subcategory?.id ?? "",
				currentPrice: productData?.currentPrice ?? 0,
				originalPrice: productData?.originalPrice ?? 0,
				isBestSeller: productData?.isBestSeller ?? false,
				isFeatured: productData?.isFeatured ?? false,
				short_description: productData?.short_description ?? "",
				description: productData?.description ?? "",
				imageUrl: productData?.imageUrl ?? "",
				imageUrls: productData?.imageUrls ?? [],
			});
		}
	}, [
		productData,
		selectedCategory,
		subcategoryData,
		isSubcategoryDataLoading,
		reset,
	]);

	// Reset form on open in add mode
	useEffect(() => {
		if (isOpen && action === "add") {
			reset(defaultFormValues);
			setSelectedCategory("");
		}
	}, [isOpen, action, reset]);

	// Submit handler
	const handleFormSubmit = async (
		values: z.infer<typeof productFormSchema>,
	) => {
		const payload = { ...values };

		if (productId) {
			await editProduct(payload);
		} else {
			await addProduct({ ...payload, createdBy: user?.id });
		}

		resetFormAndRedirect();
	};

	// Reset form and handle redirection
	const resetFormAndRedirect = () => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.delete("productId");
		newParams.delete("action");
		newParams.delete("action-type");

		router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		reset();
	};

	const handleOpenChange = (state: boolean) => {
		if (!state) resetFormAndRedirect();
	};

	// Automatically generate a slug when name changes
	const handleNameChange = useCallback(
		(name: string) => {
			setValue("slug", handleTextToSlug(name));

			setValue("name", name);
		},
		[setValue],
	);

	return {
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
		isSubcategoryDataLoading,
		selectedCategory,
	};
};

export default useProductActionFormModalFeatures;
