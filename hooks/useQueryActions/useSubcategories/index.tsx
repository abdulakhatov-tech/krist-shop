import { useSubcategoriesService } from "@/services/subcategories";
import { useQuery } from "@tanstack/react-query";

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

export const useSubCategoriesByCategory = (
	categoryId: string,
	{ enabled }: { enabled?: boolean },
) => {
	const { fetchSubCategoriesByCategory } = useSubcategoriesService();

	return useQuery({
		queryKey: ["subcategories", categoryId],
		queryFn: () => fetchSubCategoriesByCategory(categoryId),
		enabled: !!categoryId && enabled !== false,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};
