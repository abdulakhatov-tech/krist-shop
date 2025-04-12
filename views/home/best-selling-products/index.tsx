"use client";

import { ProductCard } from "@/components/generics";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { useBestSellingProducts } from "@/hooks/useQueryActions/useProducts";
import { Header } from "./customs";
import Loading from "./loading";

const BestSellingProducts = () => {
	const { data: bestSellingProducts, isLoading } = useBestSellingProducts();

	return (
		<section id="best-selling-products" className="py-10">
			<div className="container">
				<Carousel>
					<Header />

					<CarouselContent className="-pl-4">
						{isLoading ? (
							<Loading />
						) : (
							bestSellingProducts?.map((product) => (
								<CarouselItem
									key={product.id}
									className="basis-1/2 md:basis-1/3 lg:basis-1/5"
								>
									<ProductCard product={product} />
								</CarouselItem>
							))
						)}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	);
};

export default BestSellingProducts;
