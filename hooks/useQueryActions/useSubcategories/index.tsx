import { useSubcategoriesService } from "@/services/subcategories";
import { useQuery } from "@tanstack/react-query";

export const useSubcategories = () => {
	const { fetchSubCategories } = useSubcategoriesService();

	return useQuery({
		queryKey: ["subcategories"],
		queryFn: fetchSubCategories,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useGetCategory = (categoryId: string) => {
	const { fetchSubCategoriesByCategory } = useSubcategoriesService();

	return useQuery({
		queryKey: ["subcategories", categoryId],
		queryFn: () => fetchSubCategoriesByCategory(categoryId),
		enabled: !!categoryId,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};
