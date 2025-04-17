"use client";

import GenericBreadcrumb from "@/components/generics/breadcrumb";
import { StarRating } from "@/components/generics/product-card/customs";
import { Separator } from "@/components/ui/separator";
import { useGetProduct } from "@/hooks/useQueryActions/useProducts";
import { productDetailPageLinks } from "@/utils/mock-data/breadcrumbs";
import { useParams } from "next/navigation";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	useAddToCart,
	useDecrementCartItemQuantity,
	useGetCart,
	useIncrementCartItemQuantity,
} from "@/hooks/useQueryActions/useCart";
import {
	useAddToWishlist,
	useGetWishlist,
	useRemoveFromWishlist,
} from "@/hooks/useQueryActions/useWishlist";
import type { IUser } from "@/interfaces/user.interface";
import { cn } from "@/lib/utils";
import { Heart, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import Image from "next/image";
import Loading from "./loading";

const ProductDetailsView = () => {
	const params = useParams();
	const user = useAuthUser() as IUser;

	const productId = params?.productId as string;

	const { data: cart } = useGetCart(user?.id);
	const { data: wishlist } = useGetWishlist(user?.id);
	const { data: product, isLoading: isProductLoading } = useGetProduct(
		productId as string,
	);

	const { mutate: addToCart } = useAddToCart();
	const { mutate: addToWishlist } = useAddToWishlist();
	const { mutate: removeFromWishlist } = useRemoveFromWishlist();
	const { mutate: incrementCartItemQuantity } = useIncrementCartItemQuantity();
	const { mutate: decrementCartItemQuantity } = useDecrementCartItemQuantity();

	const cartItem = useMemo(() => {
		return cart?.find((item) => item?.product?.id === productId);
	}, [cart, productId]);

	const wishlistItem = useMemo(() => {
		return wishlist?.find((item) => item.product.id === productId);
	}, [wishlist, productId]);

	const handleCartAction = () => {
		if (!cartItem?.quantity) {
			addToCart({ productId: productId as string, userId: user.id });
		}
	};

	const handleWishlistToggle = () => {
		wishlistItem
			? removeFromWishlist({ productId: productId as string, userId: user.id })
			: addToWishlist({ productId: productId as string, userId: user.id });
	};

	if (isProductLoading || !product) return <Loading />;

	return (
		<section id="product-details-view" className="pb-8">
			<div className="container">
				<GenericBreadcrumb links={productDetailPageLinks} />

				<div className="grid md:grid-cols-2 gap-6 md:gap-8">
					{/* Image Section */}
					<div className="relative center bg-accent rounded-sm p-10">
						<Image
							src={product.imageUrl}
							alt={product.name}
							width={300}
							height={400}
							priority
							className="object-contain max-w-[200px] md:max-w-auto"
						/>
					</div>

					{/* Product Info Section */}
					<div className="space-y-4">
						<h1 className="text-2xl font-semibold">{product?.name}</h1>

						<div className="flex items-center gap-2 text-sm">
							<StarRating rating={product?.rating || 0} /> |
							<span className="text-[#00FF66]">In Stock</span>
						</div>

						<div className="flex items-center gap-3 text-xl">
							<span>${product?.currentPrice}</span>
							<span className="line-through text-gray-400">
								${product?.originalPrice}
							</span>
						</div>

						<div>
							<h4 className="text-lg font-medium">Short Description:</h4>
							<p>{product?.short_description}</p>
						</div>

						<Separator />

						{/* Color Options */}
						{product?.stock?.length > 0 && (
							<div className="flex items-center gap-2">
								<h4 className="text-lg">Colors:</h4>
								<RadioGroup defaultValue={product?.stock[0].color}>
									{product?.stock.map((item) => (
										<RadioGroupItem
											key={item.color}
											value={item.color}
											id={item.color}
											className={cn("p-3", `bg-[${item.color}]`)}
										/>
									))}
								</RadioGroup>
							</div>
						)}

						{/* Size Options */}
						{product?.stock?.length > 0 && (
							<div className="flex items-center gap-2">
								<h4 className="text-lg">Sizes:</h4>
								<RadioGroup defaultValue={product.stock[0].size}>
									{product?.stock?.map((item) => (
										<div
											key={item.size}
											className="flex items-center space-x-2"
										>
											<RadioGroupItem
												value={item.size}
												id={item.size}
												className="hidden"
											/>
											<Label
												htmlFor={item.size}
												className="w-7 h-7 rounded-sm bg-black flex items-center justify-center text-white uppercase"
											>
												{item.size}
											</Label>
										</div>
									))}
								</RadioGroup>
							</div>
						)}

						{/* Cart and Wishlist */}
						<div className="flex items-center gap-2">
							{!cartItem?.quantity ? (
								<Button onClick={handleCartAction}>Add to Cart</Button>
							) : (
								<div className="flex items-center gap-2">
									<Button
										onClick={() =>
											decrementCartItemQuantity({ productId, userId: user.id })
										}
									>
										<Minus />
									</Button>
									<span className="px-2 font-bold">{cartItem.quantity}</span>
									<Button
										onClick={() =>
											incrementCartItemQuantity({ productId, userId: user.id })
										}
									>
										<Plus />
									</Button>
								</div>
							)}

							<Link href="/cart" className="flex-1/2">
								<Button className="w-full">Buy Now</Button>
							</Link>

							<Button variant="outline" onClick={handleWishlistToggle}>
								<Heart
									className={cn(
										"w-5 h-5",
										wishlistItem && "text-[#DB4444] fill-[#DB4444]",
									)}
								/>
							</Button>
						</div>

						<div className="flex flex-col border rounded-sm mt-8">
							<div className="p-5 border-b flex items-center gap-4">
								<Truck className="w-7 h-7" />
								<div>
									<h4 className="text-lg font-medium">Free Delivery</h4>
									<p className="font-medium underline">
										Enter your postal code for Delivery Availability
									</p>
								</div>
							</div>
							<div className="p-5 flex items-center gap-4">
								<RotateCcw className="w-7 h-7" />
								<div>
									<h4 className="text-lg font-medium">Return Delivery</h4>
									<p className="font-medium underline">
										Free 30 Days Delivery Returns. Details
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="pt-6">
					<h4 className="text-lg font-medium">Description:</h4>
					<p>{product?.description}</p>
				</div>
			</div>
		</section>
	);
};

export default ProductDetailsView;
