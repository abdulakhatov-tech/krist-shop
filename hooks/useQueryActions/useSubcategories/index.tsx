import { useSubcategoriesService } from "@/services/subcategories";
import { useQuery } from "@tanstack/react-query";

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
