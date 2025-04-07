"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";

import {
	useEditProductStock,
	useGetProduct,
} from "@/hooks/useQueryActions/useProducts";
import {
	productStockFormSchema,
	type productStockItemSchema,
} from "@/schemas/product-stock";
import { zodResolver } from "@hookform/resolvers/zod";

const initialValue: z.infer<typeof productStockItemSchema> = {
	color: "",
	colorText: "",
	size: "",
	quantity: 0,
};

const useStockFormModalFeatures = () => {
	// hooks
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	// Get query parameters
	const productId = searchParams.get("productId") || "";
	const action = searchParams.get("action") || "";

	const { mutateAsync: editProductStock } = useEditProductStock();
	const { data: productData, isLoading: isProductDataLoading } =
		useGetProduct(productId);

	const isOpen = !!(productId && action === "stock");

	// Form setup
	const form = useForm<z.infer<typeof productStockFormSchema>>({
		resolver: zodResolver(productStockFormSchema),
		defaultValues: {
			items: [initialValue],
		},
	});

	const { reset, formState } = form;

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "items",
	});

	useEffect(() => {
		if (!isProductDataLoading && productData) {
			reset({
				items: productData.stock.map((item) => ({
					color: item.color || "#000000",
					colorText: item.color || "#000000",
					size: item.size || "m",
					quantity: item.quantity || 0,
				})),
			});
		}
	}, [productData, isProductDataLoading, reset]);

	// Submit handler
	const handleFormSubmit = async (
		values: z.infer<typeof productStockFormSchema>,
	) => {
		form.clearErrors("items");

		const seen = new Set<string>();
		let hasDuplicate = false;

		for (let i = 0; i < values.items.length; i++) {
			const { color, size } = values.items[i];
			const key = `${color}-${size}`;

			if (seen.has(key)) {
				hasDuplicate = true;
				break;
			}

			seen.add(key);
		}

		if (hasDuplicate) {
			form.setError("items", {
				type: "manual",
				message: "Duplicate items (same color & size) are not allowed",
			});
			return;
		}

		const body = values?.items?.map((item) => ({
			color: item?.color,
			size: item?.size,
			quantity: item?.quantity,
		}));

		if (Array.isArray(body)) {
			await editProductStock({ productId, body });
		}

		resetFormAndRedirect();
	};

	// Reset form and handle redirection
	const resetFormAndRedirect = () => {
		if (!formState.isSubmitting) {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.delete("productId");
			newParams.delete("action");

			router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
			form.reset();
		}
	};

	const handleOpenChange = (state: boolean) => {
		if (!state) resetFormAndRedirect();
	};

	const handleNameChange = (value: string, index: number) => {
		form.setValue(`items.${index}.color`, value, { shouldValidate: true });
		form.setValue(`items.${index}.colorText`, value);
	};

	return {
		form,
		isOpen,
		handleFormSubmit,
		handleOpenChange,
		fields,
		append,
		remove,
		initialValue,
		handleNameChange,
		errors: form.formState.errors,
		isProductDataLoading,
	};
};

export default useStockFormModalFeatures;
