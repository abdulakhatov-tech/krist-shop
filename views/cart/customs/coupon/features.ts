"use client";

import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { useGetCart } from "@/hooks/useQueryActions/useCart";
import { useAppDispatch } from "@/hooks/useRedux";
import type { IUser } from "@/interfaces/user.interface";
import { setCoupon } from "@/redux/slices/coupon";
import { couponFormSchema } from "@/schemas/coupon";
import { useCouponService } from "@/services/coupon";
import { zodResolver } from "@hookform/resolvers/zod";

const useCouponFeatures = () => {
	const dispatch = useAppDispatch();
	const user = useAuthUser() as IUser;
	const { applyCoupon } = useCouponService();
	const { data: cart, isLoading: isCartLoading } = useGetCart(user?.id);

	const subtotal =
		cart?.reduce(
			(acc, item) => acc + item?.quantity * item.product?.currentPrice,
			0,
		) || 0;

	const form = useForm<z.infer<typeof couponFormSchema>>({
		resolver: zodResolver(couponFormSchema),
		defaultValues: {
			code: "",
		},
	});

	// State to track if the code is running on the client
	const [isClient, setIsClient] = useState(false);

	// Set isClient to true once the component is mounted on the client
	useEffect(() => {
		setIsClient(true);
	}, []);

	const { reset, formState } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;

	const handleFormSubmit = async (values: z.infer<typeof couponFormSchema>) => {
		try {
			if (isCartLoading) return;

			const response = await applyCoupon({
				code: values?.code,
				subtotal,
			});

			if (response?.coupon && response?.discount && response?.total) {
				dispatch(
					setCoupon({
						code: response?.coupon,
						discount: response?.discount,
						total: response?.total,
					}),
				);

				if (isClient && typeof window !== "undefined") {
					localStorage.setItem("coupon-code", response?.coupon);
					localStorage.setItem(
						"coupon-discount",
						response?.discount?.toString(),
					);
					localStorage.setItem("coupon-total", response?.total.toString());
				}
			}

			reset();
		} catch (error) {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else if (error instanceof Error) {
				toast.error(error.message);
			}
		}
	};

	return { form, hasErrors, handleFormSubmit, isCartLoading };
};

export default useCouponFeatures;
