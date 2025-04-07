"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { useCategories } from "@/hooks/useQueryActions/useCategories";
import {
	useAddSubcategory,
	useEditSubcategory,
	useGetSubcategory,
} from "@/hooks/useQueryActions/useSubcategories";
import { subcategoryFormSchema } from "@/schemas/subcategory";
import { handleTextToSlug } from "@/utils/helper-fns/slug";

const useSubcategoryFormFeatures = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const subcategoryId = searchParams.get("subcategoryId") || "";
	const action = searchParams.get("action") as "edit" | "add" | null;

	const isOpen = !!((subcategoryId && action === "edit") || action === "add");

	const { mutateAsync: addSubcategory } = useAddSubcategory();
	const { mutateAsync: editSubcategory } = useEditSubcategory();
	const { data: subcategory, isLoading: isSubcategoryLoading } =
		useGetSubcategory(subcategoryId as string);
	const { data: category, isLoading: isCategoryLoading } = useCategories();

	const form = useForm<z.infer<typeof subcategoryFormSchema>>({
		resolver: zodResolver(subcategoryFormSchema),
		defaultValues: {
			name: "",
			slug: "",
			category: "",
			imageUrl: "",
		},
	});

	const { reset, formState, setValue } = form;
	const hasErrors = !!Object.keys(formState.errors).length;

	// Set form values when category is loaded
	useEffect(() => {
		if (subcategory && !isSubcategoryLoading) {
			reset({
				name: subcategory.name || "",
				slug: subcategory.slug || "",
				category: subcategory.category?.id || "",
				imageUrl: subcategory.imageUrl || "",
			});
		}
	}, [subcategory, reset, isSubcategoryLoading]);

	// Reset form on open in add mode
	useEffect(() => {
		if (isOpen && action === "add") {
			reset({
				name: "",
				slug: "",
				imageUrl: "",
				category: "",
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
		values: z.infer<typeof subcategoryFormSchema>,
	) => {
		try {
			if (subcategoryId) {
				await editSubcategory({ subcategoryId, body: values });
			} else {
				await addSubcategory(values);
			}

			resetFormAndRedirect();
		} catch (error) {
			toast.error(`Failed to ${subcategoryId ? "edit" : "add"} subcategory.`);
		}
	};

	// Reset form and handle redirection
	const resetFormAndRedirect = () => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.delete("subcategoryId");
		newParams.delete("action");
		newParams.delete("action-type");

		router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		reset();
	};

	const handleOpenChange = (state: boolean) => {
		if (!state) resetFormAndRedirect();
	};

	console.log(category, "category");

	return {
		form,
		hasErrors,
		handleFormSubmit,
		handleNameChange,
		isSubcategoryLoading,
		handleOpenChange,
		isOpen,
		action,
		category,
		isCategoryLoading,
	};
};

export default useSubcategoryFormFeatures;
