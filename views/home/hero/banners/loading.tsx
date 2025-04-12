import { CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<>
			<CarouselItem className="w-full">
				<Skeleton className="!w-full h-[300px] md:h-[400px]" />
			</CarouselItem>
			<CarouselItem className="w-full">
				<Skeleton className="!w-full h-[300px] md:h-[400px]" />
			</CarouselItem>
		</>
	);
};

export default Loading;
