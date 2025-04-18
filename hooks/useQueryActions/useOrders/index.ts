import { useOrdersService } from "@/services/orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	const { createOrder } = useOrdersService();

	return useMutation({
		mutationFn: createOrder,
		onSuccess: () => {
			toast.success("Order created successfully!");
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to create order.");
			}
		},
	});
};

export const useGetUserOrders = (userId: string) => {
	const { getUserOrders } = useOrdersService();

	return useQuery({
		queryKey: ["orders"],
		queryFn: () => getUserOrders(userId),
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};
