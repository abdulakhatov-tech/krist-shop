"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useGetCart } from "@/hooks/useQueryActions/useCart";
import { useAppSelector } from "@/hooks/useRedux";
import type { IUser } from "@/interfaces/user.interface";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const useCartSummaryFeatures = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const user = useAuthUser() as IUser;
	const { data: cart, isLoading: isCartLoading } = useGetCart(user?.id);
	const { discount, shippingType } = useAppSelector(
		(state) => state.couponCodeSlice,
	);

	// Calculate subtotal using useMemo to prevent unnecessary recalculations
	const subtotal = useMemo(() => {
		return (
			cart?.reduce(
				(acc, item) => acc + item?.quantity * item.product?.currentPrice,
				0,
			) || 0
		);
	}, [cart]);

	const [total, setTotal] = useState<number>(0);

	// Calculate shipping cost based on delivery method
	const shipping = useMemo(() => {
		switch (shippingType) {
			case "courier":
				return 5;
			case "postal":
				return 10;
			case "pickup":
				return 0;
			default:
				return 0;
		}
	}, [shippingType]);

	// Calculate total after coupon discount and shipping cost
	useEffect(() => {
		const calculatedTotal = subtotal + shipping - discount;
		setTotal(calculatedTotal);
	}, [subtotal, discount, shipping]);

	const handleProceedToCheckout = () => {
		setLoading(true);
		setTimeout(() => {
			router.push("/checkout");
			setLoading(false);
		}, 600);
	};

	return {
		total,
		loading,
		discount,
		subtotal,
		shipping,
		isCartLoading,
		handleProceedToCheckout,
	};
};

export default useCartSummaryFeatures;
