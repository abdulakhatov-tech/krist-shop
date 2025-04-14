"use client";

import { FormCheckbox, FormDeliveryMethod, FormInput } from "@/components/form";
import GenericBreadcrumb from "@/components/generics/breadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import { checkoutPageLinks } from "@/utils/mock-data/breadcrumbs";
import { deliveryMethods } from "@/utils/mock-data/delivery-methods";
import { paymentMethods } from "@/utils/mock-data/payment-methods";
import { CartSummary, Coupon } from "../cart/customs";
import BestSellingProducts from "../home/best-selling-products";
import { WrapperCard } from "./customs";
import useCheckoutFeatures from "./features";

const CheckoutPageView = () => {
	const { form, hasErrors, handleFormSubmit } = useCheckoutFeatures();
	const { isSubmitting } = form.formState;

	return (
		<section id="checkout-page-view" className="pb-10 md:pb-20">
			<div className="container">
				<GenericBreadcrumb links={checkoutPageLinks} />

				<h1 className="text-4xl font-medium leading-[30px] tracking-[4%] my-4 mb-8">
					Billing Address
				</h1>

				<div className="grid xl:grid-cols-[1fr_330px] gap-4 ">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleFormSubmit)}
							className="mb-20 flex flex-col gap-4"
						>
							<WrapperCard
								title="Information *"
								className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
							>
								{/* First Name Field */}
								<FormInput form={form} name="firstName" label="First Name" />

								{/* Last Name Field */}
								<FormInput form={form} name="lastName" label="Last Name" />

								{/* Phone Number Field */}
								<FormInput
									form={form}
									name="phoneNumber"
									label="Phone Number"
								/>

								{/* Email Field */}
								<FormInput form={form} name="email" label="Email" />
							</WrapperCard>

							<WrapperCard
								title="Delivery Method *"
								className="grid grid-cols-1"
							>
								<FormDeliveryMethod
									form={form}
									name="delivery"
									items={deliveryMethods}
								/>
							</WrapperCard>

							<WrapperCard
								title="Address *"
								className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
							>
								{/* Region Field */}
								<FormInput
									form={form}
									name="region"
									label="Region"
									placeholder="Enter your region (e.g., Tashkent, Jizzakh)"
								/>

								{/* District Field */}
								<FormInput
									form={form}
									name="district"
									label="District"
									placeholder="Enter your district (e.g., Chilonzor, Zafarobod)"
								/>
								{/* Extra Address Field */}
								<FormInput
									form={form}
									name="extraAddress"
									label="Extra Address"
									placeholder="Apartment, floor, landmark, etc."
								/>
							</WrapperCard>

							<WrapperCard
								title="Payment Method *"
								className="grid grid-cols-1"
							>
								<FormDeliveryMethod
									form={form}
									name="payment"
									items={paymentMethods}
								/>
							</WrapperCard>

							<FormCheckbox
								form={form}
								name="saveInfo"
								label="Save this information for faster check-out next time!"
							/>
							{/* Button */}
							<Button
								type="submit"
								disabled={isSubmitting}
								className={cn(hasErrors && "button-error", "mt-4 bg-[#DB4444]")}
							>
								{isSubmitting ? <LoadingSpinner /> : ""}{" "}
								{isSubmitting ? "Placing Order..." : "Place Order"}
							</Button>
						</form>
					</Form>
					<div className="flex flex-col gap-4">
						{/* {!discount ? <Coupon /> : ""} */}
						<div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-4">
							<Coupon />

							<CartSummary isProceedToCheckout={false} />
						</div>
					</div>
				</div>
			</div>
			<BestSellingProducts />
		</section>
	);
};

export default CheckoutPageView;
