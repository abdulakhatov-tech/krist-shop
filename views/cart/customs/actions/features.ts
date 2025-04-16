"use client";

import {
	useDecrementCartItemQuantity,
	useIncrementCartItemQuantity,
	useRemoveFromCart,
} from "@/hooks/useQueryActions/useCart";
import { useAppDispatch } from "@/hooks/useRedux";
import type { IUser } from "@/interfaces/user.interface";
import { clearCoupon, setCoupon } from "@/redux/slices/coupon";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const useCartTableActionFeatures = () => {
	const user = useAuthUser<IUser>();
	const dispatch = useAppDispatch();

	// State to check if the code is running on the client side
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		// Set isClient to true after the component is mounted in the client
		setIsClient(true);
		if (typeof window !== "undefined") {
			dispatch(
				setCoupon({
					code: localStorage.getItem("coupon-code") || "",
					discount: Number(localStorage.getItem("coupon-discount")) || 0,
					total: Number(localStorage.getItem("coupon-total")) || 0,
				}),
			);
		}
	}, [dispatch]);

	const { mutateAsync: incrementQuantity } = useIncrementCartItemQuantity();
	const { mutateAsync: decrementQuantity } = useDecrementCartItemQuantity();
	const { mutateAsync: remove } = useRemoveFromCart();

	const handleIncrementItemQuantity = async (productId: string) => {
		if (!user?.id) return;
		await incrementQuantity({ productId, userId: user.id });

		handleRemoseCouponInfo();
	};

	const handleDecrementItemQuantity = async (productId: string) => {
		if (!user?.id) return;
		await decrementQuantity({ productId, userId: user.id });

		handleRemoseCouponInfo();
	};

	const handleRemoveItem = async (productId: string) => {
		if (!user?.id) return;
		await remove({ productId, userId: user.id });

		handleRemoseCouponInfo();
	};

	const handleRemoseCouponInfo = () => {
		dispatch(clearCoupon());

		if (isClient && typeof window !== "undefined") {
			localStorage.removeItem("coupon-code");
			localStorage.removeItem("coupon-discount");
			localStorage.removeItem("coupon-total");
		}
	};

	return {
		handleIncrementItemQuantity,
		handleDecrementItemQuantity,
		handleRemoveItem,
	};
};

export default useCartTableActionFeatures;
