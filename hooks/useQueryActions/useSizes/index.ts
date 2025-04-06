import { useSizesService } from "@/services/sizes";
import { useQuery } from "@tanstack/react-query";

export const useSizes = () => {
	const { fetchSizes } = useSizesService();

	return useQuery({
		queryKey: ["sizes"],
		queryFn: fetchSizes,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};
