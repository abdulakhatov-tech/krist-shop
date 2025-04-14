"use client";

import Image from "next/image";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import GenericBreadcrumb from "@/components/generics/breadcrumb";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useGetCart } from "@/hooks/useQueryActions/useCart";
import type { ICart } from "@/interfaces/cart.interface";
import type { IUser } from "@/interfaces/user.interface";
import { formatPrice } from "@/utils/helper-fns/format-price";
import { cartPageLinks } from "@/utils/mock-data/breadcrumbs";
import { CartTableAction, Coupon, TotalBar } from "./customs";
import Loading from "./loading";

const CartPageView = () => {
	const user = useAuthUser() as IUser;
	const { data: cartItems = [], isLoading } = useGetCart(user?.id);

	return (
		<section id="cart-page-view" className="py-6">
			<div className="container">
				<GenericBreadcrumb links={cartPageLinks} />

				<div className="grid xl:grid-cols-[1fr_330px] gap-4">
					<Table className="border rounded-sm">
						<TableCaption>Your current cart items.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Product</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Quantity</TableHead>
								<TableHead>Subtotal</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<Loading />
							) : (
								cartItems.map(({ id, product, quantity }: ICart) => (
									<TableRow key={id}>
										<TableCell>
											<div className="flex items-center gap-3">
												<Image
													src={product?.imageUrl}
													alt={product.name}
													width={54}
													height={54}
													className="rounded-md"
												/>
												<h4 className="max-w-[30ch] md:max-w-[40ch] truncate">
													{product.name}
												</h4>
											</div>
										</TableCell>
										<TableCell>${product.currentPrice}</TableCell>
										<TableCell>{quantity}x</TableCell>
										<TableCell>
											{formatPrice(quantity * product.currentPrice)}
										</TableCell>
										<TableCell className="text-right">
											<CartTableAction product={product} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>

					<div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-4">
						<Coupon />
						<TotalBar />
					</div>
				</div>
			</div>
		</section>
	);
};

export default CartPageView;
