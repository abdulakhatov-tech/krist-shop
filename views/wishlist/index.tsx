"use client";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { ProductCard } from "@/components/generics";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useAddToCart } from "@/hooks/useQueryActions/useCart";
import { useGetWishlist } from "@/hooks/useQueryActions/useWishlist";
import type { IUser } from "@/interfaces/user.interface";
import FeaturedProducts from "../home/featured-products";
import Loading from "./loading";

const WishlistPageView = () => {
	const user = useAuthUser() as IUser;
	const { mutateAsync: addToCart } = useAddToCart();
	const { data: wishlist, isLoading } = useGetWishlist(user?.id);

	const handleAddAllToCart = async () => {
		if (!user?.id || !wishlist?.length) return;

		try {
			await Promise.all(
				wishlist.map(({ product }) =>
					addToCart({
						userId: user.id,
						productId: product.id,
					}),
				),
			);
		} catch (error) {
			console.error("Failed to add all items to cart:", error);
		}
	};

	return (
		<>
			<section className="py-4 sm:py-6 md:py-8">
				<div className="container">
					<Carousel>
						<div className="flex flex-col md:flex-row md:items-center justify-between mt-1 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
							<h2 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-semibold leading-12 tracking-[4%] flex items-center gap-3">
								Wishlist ({wishlist?.length})
							</h2>

							<div className="flex items-center justify-between gap-16">
								<Button variant={"outline"} onClick={handleAddAllToCart}>
									Add All To Cart
								</Button>
								<div className="relative flex items-center justify-between shrink-0 w-[30px]">
									<CarouselPrevious className="right-10 bg-accent" />
									<CarouselNext className="right-0 bg-accent" />
								</div>
							</div>
						</div>

						<CarouselContent className="-pl-4">
							{isLoading ? (
								<Loading />
							) : (
								wishlist?.map((wishlist) => (
									<CarouselItem
										key={wishlist.id}
										className="basis-1/2 md:basis-1/3 lg:basis-1/5"
									>
										<ProductCard product={wishlist?.product} />
									</CarouselItem>
								))
							)}
						</CarouselContent>
					</Carousel>
				</div>
			</section>
			<FeaturedProducts />
		</>
	);
};

export default WishlistPageView;
