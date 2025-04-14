import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useGetCart } from "@/hooks/useQueryActions/useCart";
import { useAppSelector } from "@/hooks/useRedux";
import type { IUser } from "@/interfaces/user.interface";
import { formatPrice } from "@/utils/helper-fns/format-price";
import { ShoppingCart, TicketPercent } from "lucide-react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Loading from "./laoding";

// Memoize and refactor logic to avoid unnecessary recalculations
const TotalBar = () => {
	const user = useAuthUser() as IUser;
	const { data: cart, isLoading: isCartLoading } = useGetCart(user?.id);
	const { discount: couponDiscount } = useAppSelector(
		(state) => state.couponCodeSlice,
	);

	// Calculate subtotal using useMemo to prevent unnecessary recalculations
	const subtotal = useMemo(() => {
		return (
			cart?.reduce(
				(acc, item) => acc + item?.quantity * item.product?.currentPrice,
				0,
			) || 0
		);
	}, [cart]);

	const [total, setTotal] = useState<number>(0);
	const shipping = 0;

	// Calculate total after coupon discount and shipping cost
	useEffect(() => {
		const calculatedTotal = subtotal + shipping - couponDiscount; // Shipping is hardcoded as 0
		setTotal(calculatedTotal);
	}, [subtotal, couponDiscount]);

	const couponCodeApplied = couponDiscount > 0;

	return (
		<div className="border p-4 rounded-sm">
			<h3 className="text-[20px] font-medium leading-7 mb-6">Cart Total</h3>

			{isCartLoading ? (
				<Loading />
			) : (
				<ul className="flex flex-col gap-4 mb-6">
					{/* Subtotal */}
					<PriceDetail label="Subtotal" value={subtotal} />

					{/* Coupon */}
					<PriceDetail
						label="Coupon"
						value={couponCodeApplied ? `-$${couponDiscount}` : "X"}
					/>

					{/* Shipping */}
					<PriceDetail
						label="Shipping"
						value={shipping ? "Free" : formatPrice(shipping)}
					/>

					{/* Total */}
					<PriceDetail label="Total" value={total} isTotal />
				</ul>
			)}
			<Link href="/checkout">
				<Button disabled={isCartLoading} className="w-full bg-[#DB4444]">
					<TicketPercent /> Proceed to Checkout
				</Button>
			</Link>

			<Link href="/shop">
				<Button variant="outline" className="w-full mt-2">
					<ShoppingCart /> Continue Shopping
				</Button>
			</Link>
		</div>
	);
};

// PriceDetail Component for DRY Code
const PriceDetail = ({
	label,
	value,
	isTotal = false,
}: {
	label: string;
	value: string | number;
	isTotal?: boolean;
}) => (
	<li className="flex">
		<h5 className="text-[14px] md:text-[16px] font-medium text-gray">
			{label}:
		</h5>
		<span className="flex-grow mx-2 border-b border-dashed border-[#cbcbcb]" />
		<h5
			className={`text-[14px] md:text-[16px] font-semibold ${
				isTotal ? "text-secondary-black" : "text-secondary-black"
			}`}
		>
			{typeof value === "number" ? formatPrice(value) : value}
		</h5>
	</li>
);

export default TotalBar;
