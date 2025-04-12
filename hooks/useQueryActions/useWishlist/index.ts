import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import type { IWishlist } from "@/interfaces/wishlist.interface";
import { useWishlistService } from "@/services/wishlist";

export const useAddToWishlist = () => {
	const queryClient = useQueryClient();
	const { addToWishlist } = useWishlistService();

	return useMutation({
		mutationFn: addToWishlist,
		onSuccess: () => {
			toast.success("Product has been added to wishlist.");
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to add product to wishlist.");
			}
		},
	});
};

export const useRemoveFromWishlist = () => {
	const queryClient = useQueryClient();
	const { removeFromWishlist } = useWishlistService();

	return useMutation({
		mutationFn: removeFromWishlist,
		onSuccess: (data: IWishlist) => {
			toast.success("Product removed from Wishlist!");
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
			queryClient.invalidateQueries({ queryKey: ["wishlist", data?.id] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(
					error?.message || "Failed to remove product from Wishlist.",
				);
			}
		},
	});
};

export const useGetWishlist = (userId: string) => {
	const { getWishlist } = useWishlistService();

	return useQuery({
		queryKey: ["wishlist"],
		queryFn: () => getWishlist(userId),
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};
