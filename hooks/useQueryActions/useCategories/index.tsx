import { useCategoriesService } from "@/services/categories";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
	const { fetchCategories } = useCategoriesService();

	return useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
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
