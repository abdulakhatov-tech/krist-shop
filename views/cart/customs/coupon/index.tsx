"use client";

import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import { Check } from "lucide-react";
import useCouponFeatures from "./features";

const Coupon = () => {
	const { discount } = useAppSelector((state) => state.couponCodeSlice);
	const { form, hasErrors, handleFormSubmit, isCartLoading } =
		useCouponFeatures();
	const { isSubmitting } = form.formState;

	const isDiscountAvailable =
		!!discount || !!localStorage.getItem("coupon-discount");

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
							disabled={isSubmitting || isCartLoading || isDiscountAvailable}
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
