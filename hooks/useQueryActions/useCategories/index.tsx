import type { ICategory } from "@/interfaces/category.interface";
import {
	type FetchCategoriesParams,
	useCategoriesService,
} from "@/services/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const useCategories = () => {
	const { fetchCategories } = useCategoriesService();

	return useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useCategoriesWithPagination = (params: FetchCategoriesParams) => {
	const { fetchCategoriesWithPagination } = useCategoriesService();

	return useQuery({
		queryKey: ["categories", params],
		queryFn: () => fetchCategoriesWithPagination(params),
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useGetCategory = (categoryId: string) => {
	const { fetchCategory } = useCategoriesService();

	return useQuery({
		queryKey: ["categories", categoryId],
		queryFn: () => fetchCategory(categoryId),
		enabled: !!categoryId,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useAddCategory = () => {
	const queryClient = useQueryClient();
	const { addCategory } = useCategoriesService();

	return useMutation({
		mutationFn: addCategory,
		onSuccess: () => {
			toast.success("Category added successfully!");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to add category.");
			}
		},
	});
};

export const useEditCategory = () => {
	const { editCategory } = useCategoriesService();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editCategory,
		onSuccess: (data: ICategory) => {
			toast.success("Category edited successfully!");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["categories", data?.id] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to add category.");
			}
		},
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	const { deleteCategory } = useCategoriesService();

	return useMutation({
		mutationFn: async (categoryId: string) => {
			await deleteCategory(categoryId);
			return categoryId;
		},
		onSuccess: (categoryId: string) => {
			toast.success("Category deleted successfully!");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["categories", categoryId] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to delete category.");
			}
		},
	});
};
