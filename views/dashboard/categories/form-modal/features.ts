"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import {
	useAddCategory,
	useEditCategory,
	useGetCategory,
} from "@/hooks/useQueryActions/useCategories";
import { categoryFormSchema } from "@/schemas/category";
import { handleTextToSlug } from "@/utils/helper-fns/slug";

const useCategoryFormFeatures = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const categoryId = searchParams.get("categoryId") || "";
	const action = searchParams.get("action") as "edit" | "add" | null;

	const isOpen = !!((categoryId && action === "edit") || action === "add");

	const { mutateAsync: addCategory } = useAddCategory();
	const { mutateAsync: editCategory } = useEditCategory();
	const { data: category, isLoading: isCategoryLoading } = useGetCategory(
		categoryId as string,
	);

	const form = useForm<z.infer<typeof categoryFormSchema>>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: "",
			slug: "",
			imageUrl: "",
		},
	});

	const { reset, formState, setValue } = form;
	const hasErrors = !!Object.keys(formState.errors).length;

	// Set form values when category is loaded
	useEffect(() => {
		if (category && !isCategoryLoading) {
			reset({
				name: category.name || "",
				slug: category.slug || "",
				imageUrl: category.imageUrl || "",
			});
		}
	}, [category, reset, isCategoryLoading]);

	// Reset form on open in add mode
	useEffect(() => {
		if (isOpen && action === "add") {
			reset({
				name: "",
				slug: "",
				imageUrl: "",
			});
		}
	}, [isOpen, action, reset]);

	// Handle name change to set slug automatically
	const handleNameChange = (name: string) => {
		const slug = handleTextToSlug(name);
		setValue("slug", slug);

		setValue("name", name);
	};

	const handleFormSubmit = async (
		values: z.infer<typeof categoryFormSchema>,
	) => {
		try {
			if (categoryId) {
				await editCategory({ categoryId, body: values });
			} else {
				await addCategory(values);
			}

			resetFormAndRedirect();
		} catch (error) {
			toast.error(`Failed to ${categoryId ? "edit" : "add"} category.`);
		}
	};

	// Reset form and handle redirection
	const resetFormAndRedirect = () => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.delete("categoryId");
		newParams.delete("action");
		newParams.delete("action-type");

		router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		reset();
	};

	const handleOpenChange = (state: boolean) => {
		if (!state) resetFormAndRedirect();
	};

	return {
		form,
		hasErrors,
		handleFormSubmit,
		handleNameChange,
		isCategoryLoading,
		handleOpenChange,
		isOpen,
		action,
	};
};

export default useCategoryFormFeatures;
