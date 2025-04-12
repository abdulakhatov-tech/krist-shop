import ProductCardLoading from "@/components/generics/product-card/loading";
import { CarouselItem } from "@/components/ui/carousel";
import type React from "react";

const Loading: React.FC = () => {
	return Array.from({ length: 9 }).map(() => (
		<CarouselItem
			key={crypto.randomUUID()}
			className="basis-1/2 md:basis-1/3 lg:basis-1/5"
		>
			<ProductCardLoading />
		</CarouselItem>
	));
};

export default Loading;
