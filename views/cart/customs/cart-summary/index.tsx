"use client";

import { ShoppingCart, TicketPercent } from "lucide-react";
import Link from "next/link";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/tools";
import { formatPrice } from "@/utils/helper-fns/format-price";
import { PriceDetail } from "./customs";
import useCartSummaryFeatures from "./features";
import Loading from "./laoding";

interface PropsI {
	isProceedToCheckout?: boolean;
}

const CartSummary: React.FC<PropsI> = ({ isProceedToCheckout = true }) => {
	const {
		total,
		loading,
		discount,
		shipping,
		subtotal,
		isCartLoading,
		handleProceedToCheckout,
	} = useCartSummaryFeatures();

	const isDiscountAvailable = !!discount;

	return (
		<Card className="rounded-md">
			<CardContent>
				<CardTitle className="text-[20px]">Cart Total</CardTitle>

				{isCartLoading ? (
					<Loading />
				) : (
					<ul className="flex flex-col gap-4 mt-4 mb-6">
						{/* Subtotal */}
						<PriceDetail label="Subtotal" value={subtotal} />

						{/* Coupon */}
						<PriceDetail
							label="Coupon"
							value={isDiscountAvailable ? `-$${discount}` : "X"}
						/>

						{/* Shipping */}
						<PriceDetail
							label="Shipping"
							value={shipping === 0 ? "Free" : formatPrice(shipping)}
						/>

						{/* Total */}
						<PriceDetail label="Total" value={total} isTotal />
					</ul>
				)}

				{isProceedToCheckout && (
					<Button
						disabled={isCartLoading}
						className="w-full bg-[#DB4444]"
						onClick={handleProceedToCheckout}
					>
						{loading ? <LoadingSpinner /> : <TicketPercent />} Proceed to
						Checkout
					</Button>
				)}

				<Link href="/shop">
					<Button variant="outline" className="w-full mt-2">
						<ShoppingCart /> Continue Shopping
					</Button>
				</Link>
			</CardContent>
		</Card>
	);
};

export default CartSummary;
