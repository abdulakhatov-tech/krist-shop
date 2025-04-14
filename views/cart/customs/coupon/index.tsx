import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import { Check } from "lucide-react";
import useCouponFeatures from "./features";

const Coupon = () => {
	const { form, hasErrors, handleFormSubmit, isCartLoading } =
		useCouponFeatures();
	const { isSubmitting } = form.formState;
	const isCouponAvailable = !!localStorage.getItem("coupon-discount");

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
					{isSubmitting ? <LoadingSpinner /> : ""}{" "}
					{isSubmitting ? (
						"Applying Coupon..."
					) : isCouponAvailable ? (
						<>
							<Check /> Applied Coupon
						</>
					) : (
						"Apply Coupon"
					)}
					{}
				</Button>
			</form>
		</Form>
	);
};

export default Coupon;
