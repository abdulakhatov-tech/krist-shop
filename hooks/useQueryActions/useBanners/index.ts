import type { IBanner } from "@/interfaces/banner.interface";
import { type FetchBannersParams, useBannersService } from "@/services/banners";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const useBanners = (params: FetchBannersParams) => {
	const { fetchBanners } = useBannersService();

	return useQuery({
		queryKey: ["banners", params],
		queryFn: () => fetchBanners(params),
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useBannersWithoutPagination = () => {
	const { fetchBannersWithoutPagination } = useBannersService();

	return useQuery({
		queryKey: ["banners"],
		queryFn: fetchBannersWithoutPagination,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useGetBanner = (bannerId: string) => {
	const { fetchBanner } = useBannersService();

	return useQuery({
		queryKey: ["banners", bannerId],
		queryFn: () => fetchBanner(bannerId),
		enabled: !!bannerId,
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});
};

export const useAddBanners = () => {
	const queryClient = useQueryClient();
	const { addBanner } = useBannersService();

	return useMutation({
		mutationFn: addBanner,
		onSuccess: () => {
			toast.success("Banner added successfully!");
			queryClient.invalidateQueries({ queryKey: ["banners"] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to add banner.");
			}
		},
	});
};

export const useEditBanner = () => {
	const { editBanner } = useBannersService();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: editBanner,
		onSuccess: (data: IBanner) => {
			toast.success("Banner edited successfully!");
			queryClient.invalidateQueries({ queryKey: ["banners"] });
			queryClient.invalidateQueries({ queryKey: ["banners", data?.id] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to edit banner.");
			}
		},
	});
};

export const useDeleteBanner = () => {
	const queryClient = useQueryClient();
	const { deleteBanner } = useBannersService();

	return useMutation({
		mutationFn: async (bannerId: string) => {
			await deleteBanner(bannerId);
			return bannerId;
		},
		onSuccess: (bannerId: string) => {
			toast.success("Banner deleted successfully!");
			queryClient.invalidateQueries({ queryKey: ["banners"] });
			queryClient.invalidateQueries({ queryKey: ["banners", bannerId] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error(error?.message || "Failed to delete banner.");
			}
		},
	});
};
