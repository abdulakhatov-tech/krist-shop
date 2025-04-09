import { CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";

const Loading: React.FC = () => {
	return Array.from({ length: 9 }).map(() => (
		<CarouselItem
			key={crypto.randomUUID()}
			className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 border p-5 rounded-sm ml-4"
		>
			<div className="flex flex-col gap-4 items-center justify-center">
				<Skeleton className="w-20 h-15 md:h-16" />

				<Skeleton className="w-full h-5 md:h-6" />
			</div>
		</CarouselItem>
	));
};

export default Loading;
