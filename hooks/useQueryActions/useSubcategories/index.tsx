import type { ISubcategory } from "@/interfaces/subcategory.interface";
import {
	type FetchSubcategoriesParams,
	useSubcategoriesService,
} from "@/services/subcategories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

interface UseSubCategoriesOptions {
	enabled?: boolean;
}

export const useSubcategories = ({ enabled }: { enabled?: boolean }) => {
	const { fetchSubCategories } = useSubcategoriesService();

	return useQuery({
		queryKey: ["subcategories"],
		queryFn: fetchSubCategories,
		staleTime: 1000 * 60 * 5,
		enabled,
		retry: 2,
	});
};

export const useGetSubcategory = (subcategoryId: string) => {
	const { fetchSubcategory } = useSubcategoriesService();

	return useQuery({
		queryKey: ["categories", subcategoryId],
		queryFn: () => fetchSubcategory(subcategoryId),
		enabled: !!subcategoryId,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useSubcategoriesWithPagination = (
	params: FetchSubcategoriesParams,
) => {
	const { fetchSubcategoriesWithPagination } = useSubcategoriesService();

	return useQuery({
		queryKey: ["subcategories", params],
		queryFn: () => fetchSubcategoriesWithPagination(params),
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useSubCategoriesByCategorySlug = (
	categorySlug: string,
	options: UseSubCategoriesOptions = {},
) => {
	const { fetchSubCategoriesByCategorySlug } = useSubcategoriesService();

	const isEnabled = Boolean(categorySlug && options.enabled !== false);

	return useQuery({
		queryKey: ["subcategories", categorySlug],
		queryFn: () => fetchSubCategoriesByCategorySlug(categorySlug),
		enabled: isEnabled,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useSubCategoriesByCategoryId = (
	categoryId: string,
	options: UseSubCategoriesOptions = {},
) => {
	const { fetchSubCategoriesByCategoryId } = useSubcategoriesService();

	const isEnabled = Boolean(categoryId && options.enabled !== false);

	return useQuery({
		queryKey: ["subcategories", categoryId],
		queryFn: () => fetchSubCategoriesByCategoryId(categoryId),
		enabled: isEnabled,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useAddSubcategory = () => {
	const queryClient = useQueryClient();
	const { addSubcategory } = useSubcategoriesService();

	return useMutation({
		mutationFn: addSubcategory,
		onSuccess: () => {
			toast.success("Subcategory added successfully!");
			queryClient.invalidateQueries({ queryKey: ["subcategories"] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to add subcategory.");
			}
		},
	});
};

export const useEditSubcategory = () => {
	const { editSubcategory } = useSubcategoriesService();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editSubcategory,
		onSuccess: (data: ISubcategory) => {
			toast.success("Subcategory edited successfully!");
			queryClient.invalidateQueries({ queryKey: ["subcategories"] });
			queryClient.invalidateQueries({ queryKey: ["subcategories", data?.id] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to edit subcategory.");
			}
		},
	});
};

export const useDeleteSubcategory = () => {
	const queryClient = useQueryClient();
	const { deleteSubcategory } = useSubcategoriesService();

	return useMutation({
		mutationFn: async (subcategoryId: string) => {
			await deleteSubcategory(subcategoryId);
			return subcategoryId;
		},
		onSuccess: (subcategoryId: string) => {
			toast.success("Subcategory deleted successfully!");
			queryClient.invalidateQueries({ queryKey: ["subcategories"] });
			queryClient.invalidateQueries({
				queryKey: ["subcategories", subcategoryId],
			});
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to delete subcategory.");
			}
		},
	});
};
