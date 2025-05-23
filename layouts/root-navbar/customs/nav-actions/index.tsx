"use client";

import { Heart, Search, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import type React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Badge } from "@/components/ui/badge";
import { useGetCart } from "@/hooks/useQueryActions/useCart";
import { useGetWishlist } from "@/hooks/useQueryActions/useWishlist";
import type { IUser } from "@/interfaces/user.interface";
import { CustomTooltip, LoadingSpinner } from "@/tools";
import useNavActionsFeatures from "./features";

const NavActions: React.FC = () => {
	const user = useAuthUser() as IUser;
	const { data: wishlist, isLoading: isWishlistLoading } = useGetWishlist(
		user?.id,
	);

	const { data: cart, isLoading: isCartLoading } = useGetCart(user?.id);

	const { handleClick } = useNavActionsFeatures();

	return (
		<ul className="flex items-center gap-4">
			<li>
				<CustomTooltip title={"Search"}>
					<Search onClick={() => handleClick("search")} />
				</CustomTooltip>
			</li>
			<Link href="/wishlist">
				<li className="relative">
					<CustomTooltip title={"Heart"}>
						{wishlist?.length ? (
							<Badge className="bg-[#DB4444] rounded-full absolute -top-3 -right-4 center">
								{isWishlistLoading ? <LoadingSpinner /> : wishlist?.length}
							</Badge>
						) : (
							""
						)}

						<Heart onClick={() => handleClick("favorites")} />
					</CustomTooltip>
				</li>
			</Link>
			<Link href="/cart">
				<li className="relative">
					<CustomTooltip title={"Shopping Cart"}>
						{cart?.length ? (
							<Badge className="bg-[#DB4444] rounded-full absolute -top-3 -right-4 center">
								{isCartLoading ? (
									<LoadingSpinner />
								) : (
									cart?.reduce((acc, item) => acc + item.quantity, 0)
								)}
							</Badge>
						) : (
							""
						)}

						<ShoppingBasket onClick={() => handleClick("shopping-cart")} />
					</CustomTooltip>
				</li>
			</Link>
		</ul>
	);
};

export default NavActions;
