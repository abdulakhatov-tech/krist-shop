"use client";

import { ProductCard } from "@/components/generics";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { useFeaturedProducts } from "@/hooks/useQueryActions/useProducts";
import { Header } from "./customs";
import Loading from "./loading";

const FeaturedProducts = () => {
	const { data: featuredProducts, isLoading } = useFeaturedProducts();

	return (
		<section id="featured-products" className="py-4 sm:py-6 md:py-10">
			<div className="container">
				<Carousel>
					<Header />

					<CarouselContent className="-pl-4">
						{isLoading ? (
							<Loading />
						) : (
							featuredProducts?.map((product) => (
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

export default FeaturedProducts;
