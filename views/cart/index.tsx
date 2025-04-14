"use client";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import GenericBreadcrumb from "@/components/generics/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption } from "@/components/ui/table";
import { useGetCart } from "@/hooks/useQueryActions/useCart";
import type { ICart } from "@/interfaces/cart.interface";
import type { IUser } from "@/interfaces/user.interface";
import { cartPageLinks } from "@/utils/mock-data/breadcrumbs";
import FeaturedProducts from "../home/featured-products";
import { CartItem, CartSummary, Coupon, Header } from "./customs";
import Loading from "./loading";

const CartPageView = () => {
	const user = useAuthUser() as IUser;
	const { data: cartItems = [], isLoading } = useGetCart(user?.id);

	return (
		<section id="cart-page-view" className="pb-10 md:pb-20">
			<div className="container">
				<GenericBreadcrumb links={cartPageLinks} />

				<div className="grid xl:grid-cols-[1fr_330px] gap-4 mb-20">
					<Card>
						<CardContent>
							<Table>
								<TableCaption>Your current cart items.</TableCaption>
								<Header />
								<TableBody>
									{isLoading ? (
										<Loading />
									) : (
										cartItems.map((cartItem: ICart) => (
											<CartItem key={cartItem?.id} {...cartItem} />
										))
									)}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
					<div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-4">
						<Coupon />
						<CartSummary />
					</div>
				</div>
			</div>

			<FeaturedProducts />
		</section>
	);
};

export default CartPageView;
