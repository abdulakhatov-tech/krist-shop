"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import {
	useAddBanners,
	useEditBanner,
	useGetBanner,
} from "@/hooks/useQueryActions/useBanners";
import { useProductsWithoutPagination } from "@/hooks/useQueryActions/useProducts";
import { bannerFormSchema } from "@/schemas/banner";
import { handleTextToSlug } from "@/utils/helper-fns/slug";
import { zodResolver } from "@hookform/resolvers/zod";

const useBannerFormModalFeatures = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const bannerId = searchParams.get("bannerId") || "";
	const action = searchParams.get("action") as "edit" | "add";

	const isOpen = !!((bannerId && action === "edit") || action === "add");

	const { mutateAsync: addBanner } = useAddBanners();
	const { mutateAsync: editBanner } = useEditBanner();
	const { data: banner, isLoading: isBannerLoading } = useGetBanner(
		bannerId as string,
	);

	const { data: productsData, isLoading: isProductsDataLoading } =
		useProductsWithoutPagination();

	const form = useForm<z.infer<typeof bannerFormSchema>>({
		resolver: zodResolver(bannerFormSchema),
		defaultValues: {
			name: "",
			slug: "",
			imageUrl: "",
			description: "",
			isActive: false,
			product: "",
		},
	});

	const { reset, formState, setValue } = form;
	const hasErrors = !!Object.keys(formState.errors).length;

	// Set form values when editing an existing banner
	useEffect(() => {
		if (!isBannerLoading && banner) {
			reset({
				name: banner.name || "",
				slug: banner.slug || "",
				imageUrl: banner.imageUrl || "",
				description: banner.description || "",
				isActive: banner.isActive || false,
				product: banner.product?.id || "",
			});
		}
	}, [banner, isBannerLoading, reset]);

	// Clean form when opening in add mode
	useEffect(() => {
		if (isOpen && action === "add") {
			reset({
				name: "",
				slug: "",
				imageUrl: "",
				description: "",
				isActive: false,
				product: "",
			});
		}
	}, [isOpen, action, reset]);

	// Handle name change to set slug automatically
	const handleNameChange = (name: string) => {
		const slug = handleTextToSlug(name);
		setValue("slug", slug);

		setValue("name", name);
	};

	const handleFormSubmit = async (values: z.infer<typeof bannerFormSchema>) => {
		try {
			if (bannerId) {
				await editBanner({ bannerId, body: values });
			} else {
				await addBanner(values);
			}

			resetFormAndRedirect();
		} catch (error) {
			toast.error(`Failed to ${bannerId ? "edit" : "add"} banner.`);
		}
	};

	// Reset form and handle redirection
	const resetFormAndRedirect = () => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.delete("bannerId");
		newParams.delete("action");
		newParams.delete("action-type");

		router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		reset();
	};

	const handleOpenChange = (state: boolean) => {
		if (!state) {
			resetFormAndRedirect();
		}
	};

	return {
		form,
		isOpen,
		action,
		hasErrors,
		isBannerLoading,
		handleFormSubmit,
		handleNameChange,
		handleOpenChange,
		isProductsDataLoading,
		productsData,
	};
};

export default useBannerFormModalFeatures;
