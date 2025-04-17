"use client";

import { Eye, Heart, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { useAddToCart, useGetCart } from "@/hooks/useQueryActions/useCart";
import {
	useAddToWishlist,
	useGetWishlist,
	useRemoveFromWishlist,
} from "@/hooks/useQueryActions/useWishlist";
import type { ICart } from "@/interfaces/cart.interface";
import type { IProduct } from "@/interfaces/product.interface";
import type { IUser } from "@/interfaces/user.interface";
import type { IWishlist } from "@/interfaces/wishlist.interface";
import { CustomTooltip, LoadingSpinner } from "@/tools";

const ActionButtons: FC<{
	product: IProduct;
}> = ({ product }) => {
	const router = useRouter();
	const user = useAuthUser() as IUser;
	const isAuthenticated = useAuthHeader();

	const { mutateAsync: addToWishlist } = useAddToWishlist();
	const { mutateAsync: removeFromWishlist } = useRemoveFromWishlist();
	const { data: bookmark, isLoading: isBookmarkLoading } = useGetWishlist(
		user?.id,
	);

	const { data: cart, isLoading: isCartLoading } = useGetCart(user?.id);

	const { mutateAsync: addToCart } = useAddToCart();

	const isProductInWishlist = bookmark?.some(
		(wishlist: IWishlist) => wishlist.product.id === product.id,
	);

	const exisitingProductInCart = cart?.find(
		(cart: ICart) => cart.product.id === product.id,
	);
	console.log(exisitingProductInCart, "exisitingProductInCart");

	const handleWishlist = async () => {
		if (!isAuthenticated) {
			router.push("/auth/sign-in");
			return;
		}

		if (isProductInWishlist) {
			await removeFromWishlist({
				userId: user?.id,
				productId: product?.id,
			});

			return;
		}

		if (user?.id && product) {
			await addToWishlist({
				userId: user?.id,
				productId: product?.id,
			});
		}
	};

	const handleAddToCart = async () => {
		if (!isAuthenticated) {
			router.push("/auth/sign-in");
			return;
		}

		if (user?.id && product) {
			await addToCart({
				userId: user?.id,
				productId: product?.id,
			});
		}
	};

	return (
		<div className="absolute top-2 right-2 z-10 flex flex-col gap-1 cursor-pointer">
			<div
				onClick={handleWishlist}
				onKeyUp={(e) => e.code === "Enter" && handleWishlist()}
				onKeyDown={(e) => e.code === "Enter" && handleWishlist()}
				className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-[orange] center custom-shadow hover:bg-orange active:bg-orange text-white p-[5px]"
			>
				{isBookmarkLoading ? (
					<LoadingSpinner />
				) : isProductInWishlist ? (
					<CustomTooltip title="Remove Product from Wishlist">
						<Heart className="text-[#DB4444] fill-[#DB4444]" />
					</CustomTooltip>
				) : (
					<CustomTooltip title="Add Product to Wishlist">
						<Heart className="text-white" />
					</CustomTooltip>
				)}
			</div>
			<div
				onClick={handleAddToCart}
				onKeyUp={(e) => e.code === "Enter" && handleAddToCart()}
				onKeyDown={(e) => e.code === "Enter" && handleAddToCart()}
				className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-[orange] center custom-shadow hover:bg-orange active:bg-orange text-white p-[5px] relative"
			>
				<CustomTooltip
					title={
						!exisitingProductInCart
							? "Add Product to Cart"
							: `Increment Quantity (${exisitingProductInCart?.quantity} items already exist)`
					}
				>
					{isCartLoading ? <LoadingSpinner /> : <ShoppingBasket />}
				</CustomTooltip>
			</div>
			<Link href={`/products/details/${product.id}`}>
				<div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-[orange] center custom-shadow hover:bg-orange active:bg-orange text-white p-[5px]">
					<Eye />
				</div>
			</Link>
		</div>
	);
};

export default ActionButtons;
