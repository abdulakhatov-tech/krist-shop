"use client";

import Autoplay from "embla-carousel-autoplay";
import type React from "react";

import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import type { IBanner } from "@/interfaces/banner.interface";
import { banners } from "@/utils/mock-data/banners";
import CategoryListModal from "../category-list/mobile-mode";
import BannerItem from "./banner-item";

const Banners: React.FC = () => {
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 2500,
				}),
			]}
			opts={{
				loop: true,
			}}
		>
			<CarouselContent>
				{banners?.map((banner: IBanner) => (
					<BannerItem key={banner?.id} {...banner} />
				))}
			</CarouselContent>
			<CarouselPrevious className="top-64 md:top-90 left-5" />
			<CarouselNext className="top-64 md:top-90 right-5" />

			<CategoryListModal />
		</Carousel>
	);
};

export default Banners;
