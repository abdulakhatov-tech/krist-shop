"use client";

import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import useCouponFeatures from "./features";

const Coupon = () => {
	const { form, hasErrors, handleFormSubmit, isCartLoading } =
		useCouponFeatures();
	const { isSubmitting } = form.formState;

	const { discount } = useAppSelector((state) => state.couponCodeSlice);

	// Track coupon availability in local state to ensure reactivity
	const [isCouponAvailable, setIsCouponAvailable] = useState(false);

	// Check if the coupon is already applied from localStorage
	useEffect(() => {
		const couponDiscount = discount || localStorage.getItem("coupon-discount");
		setIsCouponAvailable(Boolean(couponDiscount));
	}, [discount]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className="flex flex-col gap-4 border p-4 rounded-sm h-fit"
			>
				{/* Identifier Field */}
				<FormInput
					form={form}
					name="code"
					label="Coupon Code"
					disabled={isCouponAvailable}
				/>

				{/* Button */}
				<Button
					type="submit"
					disabled={isSubmitting || isCartLoading || isCouponAvailable}
					className={cn(hasErrors && "button-error", "bg-[#DB4444]")}
				>
					{isSubmitting ? (
						<LoadingSpinner />
					) : isCouponAvailable ? (
						<>
							<Check /> Applied Coupon
						</>
					) : (
						"Apply Coupon"
					)}
				</Button>
			</form>
		</Form>
	);
};

export default Coupon;
