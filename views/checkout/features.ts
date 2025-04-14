"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { useAppDispatch } from "@/hooks/useRedux";
import { setShipping } from "@/redux/slices/coupon";
import { checkoutFormSchema } from "@/schemas/checkout";
import { zodResolver } from "@hookform/resolvers/zod";

const useCheckoutFeatures = () => {
	const dispatch = useAppDispatch();

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

	const { formState, watch } = form;
	const hasErrors = Object.keys(formState.errors).length > 0;

	const handleFormSubmit = async (
		values: z.infer<typeof checkoutFormSchema>,
	) => {
		console.log(values);
	};

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

	return { form, hasErrors, handleFormSubmit };
};
export default useCheckoutFeatures;
