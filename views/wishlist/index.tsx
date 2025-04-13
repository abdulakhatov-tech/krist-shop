"use client";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { ProductCard } from "@/components/generics";
import { useGetWishlist } from "@/hooks/useQueryActions/useWishlist";
import type { IUser } from "@/interfaces/user.interface";
import type { IWishlist } from "@/interfaces/wishlist.interface";
import Loading from "./loading";

const WishlistPageView = () => {
	const user = useAuthUser() as IUser;
	const { data: wishlist, isLoading } = useGetWishlist(user?.id);

	return (
		<section className="py-4 sm:py-6 md:py-8">
			<div className="container">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
					Wishlist
				</h1>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
					{isLoading ? (
						<Loading />
					) : wishlist?.length ? (
						wishlist?.map((item: IWishlist) => (
							<ProductCard key={item.id} product={item.product} />
						))
					) : (
						<h4>No wishlist yet</h4>
					)}
				</div>
			</div>
		</section>
	);
};

export default WishlistPageView;
