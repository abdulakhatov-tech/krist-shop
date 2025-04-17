"use client";

import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import useCouponFeatures from "./features";

const Coupon = () => {
	const { discount } = useAppSelector((state) => state.couponCodeSlice);
	const { form, hasErrors, handleFormSubmit, isCartLoading, cart } =
		useCouponFeatures();
	const { isSubmitting } = form.formState;

	const [isDiscountAvailable, setIsDiscountAvailable] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const localDiscount = localStorage.getItem("coupon-discount");
			setIsDiscountAvailable(!!discount || !!localDiscount);
		}
	}, [discount]);

	return (
		<Card className="rounded-md">
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className="flex flex-col gap-4 h-fit"
					>
						{/* Identifier Field */}
						<FormInput
							form={form}
							name="code"
							label="Coupon Code"
							disabled={isDiscountAvailable}
						/>

						{/* Button */}
						<Button
							type="submit"
							disabled={
								isSubmitting ||
								isCartLoading ||
								isDiscountAvailable ||
								!cart?.length
							}
							className={cn(hasErrors && "button-error", "bg-[#DB4444] w-full")}
						>
							{isSubmitting ? (
								<LoadingSpinner />
							) : isDiscountAvailable ? (
								<>
									<Check /> Applied Coupon
								</>
							) : (
								"Apply Coupon"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default Coupon;
