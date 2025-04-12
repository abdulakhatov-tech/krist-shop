import type { FC } from "react";

import { Badge } from "@/components/ui/badge";
import type { IProduct } from "@/interfaces/product.interface";
import { ActionButtons, RenderImages, StarRating } from "./customs";

const ProductCard: FC<{ product: IProduct; noSlide?: boolean }> = ({
	product,
	noSlide,
}) => {
	const {
		imageUrl,
		imageUrls,
		name,
		currentPrice,
		discount,
		originalPrice,
		category,
		subcategory,
		rating,
	} = product;

	return (
		<div className="border custom-shadow p-2 rounded-[8px]  transition-transform duration-300 ease-in-out transform hover:scale-[0.95] hover:shadow-lg bg-accent hover:bg-gray-50">
			<div className="relative max-h-[240px] sm:max-h-[245px] w-full overflow-hidden rounded-[6px] border bg-white">
				<RenderImages
					imageUrl={imageUrl}
					imageUrls={imageUrls}
					noSlide={noSlide}
				/>
				{discount ? (
					<span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg cursor-pointer">
						{discount}% OFF
					</span>
				) : (
					""
				)}
				<ActionButtons product={product} />
			</div>
			<div className="py-2 flex flex-col gap-1">
				<h3 className="text-[16px] md:text-[18px] font-semibold leading-[21.78px] text-black truncate">
					{name}
				</h3>
				<div className="flex items-center gap-1">
					<h3 className="font-semibold leading-[24.38px]">${currentPrice}</h3>/
					<h3 className="font-semibold leading-[24.38px] line-through text-gray-400">
						${originalPrice}
					</h3>
				</div>
				<div className="flex flex-wrap items-center gap-1">
					<Badge className="bg-red-600">{category?.name}</Badge>
					<Badge className="bg-red-600">{subcategory?.name}</Badge>
				</div>

				<StarRating rating={rating} />
			</div>
		</div>
	);
};

export default ProductCard;
