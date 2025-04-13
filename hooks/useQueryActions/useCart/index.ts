import type { ICart } from "@/interfaces/cart.interface";
import { useCartService } from "@/services/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const useAddToCart = () => {
	const queryClient = useQueryClient();
	const { addToCart } = useCartService();

	return useMutation({
		mutationFn: addToCart,
		onSuccess: () => {
			toast.success("Product has been added to cart.");
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to add product to cart.");
			}
		},
	});
};

export const useRemoveFromCart = () => {
	const queryClient = useQueryClient();
	const { removeFromCart } = useCartService();

	return useMutation({
		mutationFn: removeFromCart,
		onSuccess: (data: ICart) => {
			toast.success("Product removed from Cart!");
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			queryClient.invalidateQueries({ queryKey: ["cart", data?.id] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to remove product from Cart.");
			}
		},
	});
};

export const useIncrementCartItemQuantity = () => {
	const queryClient = useQueryClient();
	const { incrementQuantity } = useCartService();

	return useMutation({
		mutationFn: incrementQuantity,
		onSuccess: (data: ICart) => {
			toast.success("Cart item quantity incremented.");
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			queryClient.invalidateQueries({ queryKey: ["cart", data?.id] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(
					error?.message || "Failed to increment cart item quantity.",
				);
			}
		},
	});
};

export const useDecrementCartItemQuantity = () => {
	const queryClient = useQueryClient();
	const { decrementQuantity } = useCartService();

	return useMutation({
		mutationFn: decrementQuantity,
		onSuccess: (data: ICart) => {
			toast.success("Cart item quantity decremented.");
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			queryClient.invalidateQueries({ queryKey: ["cart", data?.id] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(
					error?.message || "Failed to decrement cart item quantity.",
				);
			}
		},
	});
};

export const useGetCart = (userId: string) => {
	const { getCart } = useCartService();

	return useQuery({
		queryKey: ["cart"],
		queryFn: () => getCart(userId),
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};
