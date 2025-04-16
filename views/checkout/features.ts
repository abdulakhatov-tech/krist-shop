"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { useGetCart } from "@/hooks/useQueryActions/useCart";
import { useCreateOrder } from "@/hooks/useQueryActions/useOrders";
import { useEditUserOrderInfo } from "@/hooks/useQueryActions/useUsers";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import type { ICart } from "@/interfaces/cart.interface";
import type { IUser } from "@/interfaces/user.interface";
import { setShipping } from "@/redux/slices/coupon";
import { checkoutFormSchema } from "@/schemas/checkout";
import { zodResolver } from "@hookform/resolvers/zod";

const DELIVERY_COSTS = {
	courier: 5,
	postal: 10,
	pickup: 0,
} as const;

const useCheckoutFeatures = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const user = useAuthUser() as IUser;
	const [loading, setLoading] = useState(false);

	const { mutateAsync: createOrder } = useCreateOrder();
	const { mutateAsync: editUserOrderInfo } = useEditUserOrderInfo(user?.id);
	const { data: cartData, isLoading: cartDataLoading } = useGetCart(user?.id);

	const { discount = 0 } = useAppSelector((state) => state.couponCodeSlice);

	const form = useForm<z.infer<typeof checkoutFormSchema>>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			region: "",
			district: "",
			extraAddress: "",
			delivery: "pickup",
			payment: "cash",
			saveInfo: true,
		},
	});

	const { formState, watch, reset } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;

	const handleFormSubmit = async (
		values: z.infer<typeof checkoutFormSchema>,
	) => {
		try {
			if (cartDataLoading) return;

			const shipping =
				values.delivery === "pickup"
					? 0
					: values.delivery === "courier"
						? 5
						: 10;

			if (values.payment === "cash") {
				const orderInfoBody = {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					phoneNumber: values.phoneNumber,
					region: values.region,
					district: values.district,
					extraAddress: values.extraAddress,
				};

				const body = {
					userId: user?.id,
					products: cartData?.map((item: ICart) => ({
						productId: item.product.id,
						quantity: item.quantity,
					})),
					delivery_method: watch("delivery"),
					payment_method: watch("payment"),
					region: watch("region"),
					district: watch("district"),
					extraAddress: watch("extraAddress"),
					shipping,
					coupon: discount,
				};

				await editUserOrderInfo(orderInfoBody);

				if (!cartData) {
					toast.error("No products in cart.");
					return;
				}
				await createOrder(body);
				reset();
				router.push("/");
			} else {
				toast.success("Redirecting to Payme | Click...");
			}
		} catch (error) {
			toast.error("An error occurred during checkout.");
		}
	};

	useEffect(() => {
		if (user) {
			setLoading(true);
			reset({
				firstName: user?.firstName,
				lastName: user?.lastName,
				email: user?.email ?? "",
				phoneNumber: user?.phoneNumber ?? "",
				region: user?.region ?? "",
				district: user?.district ?? "",
				extraAddress: user?.extraAddress ?? "",
				delivery: "pickup",
				payment: "cash",
				saveInfo: true,
			});
			setLoading(false);
		}
	}, [user, reset]);

	useEffect(() => {
		const subscription = watch((value) => {
			if (value.delivery) {
				dispatch(
					setShipping(value.delivery as "pickup" | "courier" | "postal"),
				);
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, dispatch]);

	return { form, hasErrors, handleFormSubmit, loading };
};
export default useCheckoutFeatures;
