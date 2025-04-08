import {
	type FetchNewsletterParams,
	useNewslettersService,
} from "@/services/newsletters";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const useNewsletters = (params: FetchNewsletterParams) => {
	const { fetchNewsletters } = useNewslettersService();

	return useQuery({
		queryKey: ["newsletters", params],
		queryFn: () => fetchNewsletters(params),
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useDeleteNewsletter = () => {
	const queryClient = useQueryClient();
	const { deleteNewsletter } = useNewslettersService();

	return useMutation({
		mutationFn: async (newsletterId: string) => {
			await deleteNewsletter(newsletterId);
			return newsletterId;
		},
		onSuccess: (newsletterId: string) => {
			toast.success("User is deleted from Newsletter subscription!");
			queryClient.invalidateQueries({ queryKey: ["newsletters"] });
			queryClient.invalidateQueries({
				queryKey: ["newsletters", newsletterId],
			});
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(
					error?.message || "Failed to delete user from subscription.",
				);
			}
		},
	});
};
