"use client";

import type React from "react";

import { CustomTooltip, LoadingSpinner } from "@/tools";
import { Heart, Search, ShoppingBasket } from "lucide-react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useNavActionsFeatures from "./features";

import { Badge } from "@/components/ui/badge";
import { useGetCart } from "@/hooks/useQueryActions/useCart";
import { useGetWishlist } from "@/hooks/useQueryActions/useWishlist";
import type { IUser } from "@/interfaces/user.interface";

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
			<li className="relative">
				<CustomTooltip title={"Heart"}>
					<Badge className="bg-red-600 rounded-full absolute -top-3 -right-4 center">
						{isWishlistLoading ? <LoadingSpinner /> : wishlist?.length}
					</Badge>
					<Heart onClick={() => handleClick("favorites")} />
				</CustomTooltip>
			</li>
			<li className="relative">
				<CustomTooltip title={"Shopping Cart"}>
					<Badge className="bg-red-600 rounded-full absolute -top-3 -right-4 center">
						{isCartLoading ? <LoadingSpinner /> : cart?.length}
					</Badge>
					<ShoppingBasket onClick={() => handleClick("shopping-cart")} />
				</CustomTooltip>
			</li>
		</ul>
	);
};

export default NavActions;
