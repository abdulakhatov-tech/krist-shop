"use client";

import {
	useDecrementCartItemQuantity,
	useIncrementCartItemQuantity,
	useRemoveFromCart,
} from "@/hooks/useQueryActions/useCart";
import { useAppDispatch } from "@/hooks/useRedux";
import type { IUser } from "@/interfaces/user.interface";
import { clearCoupon } from "@/redux/slices/coupon";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const useCartTableActionFeatures = () => {
	const user = useAuthUser<IUser>();
	const dispatch = useAppDispatch();

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
	};

	return {
		handleIncrementItemQuantity,
		handleDecrementItemQuantity,
		handleRemoveItem,
	};
};

export default useCartTableActionFeatures;
