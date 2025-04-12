"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { type FC, useEffect, useMemo, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface RenderImagesProps {
	imageUrl: string;
	imageUrls: string[];
	noSlide?: boolean;
}

const RenderImages: FC<RenderImagesProps> = ({
	imageUrl,
	imageUrls,
	noSlide = false,
}) => {
	const [preloadedImageUrl, setPreloadedImageUrl] = useState(imageUrl);

	useEffect(() => {
		const img = new window.Image();
		img.src = imageUrl;
		img.onload = () => setPreloadedImageUrl(imageUrl);
	}, [imageUrl]);

	const carouselPlugins = useMemo(() => {
		return noSlide ? [] : [Autoplay({ delay: 2000, stopOnInteraction: false })];
	}, [noSlide]);

	//   if (imageUrls.length > 0) {
	//     return (
	//       <Carousel plugins={carouselPlugins}>
	//         <CarouselContent>
	//           {imageUrls.map((url, index) => (
	//             <CarouselItem key={index}>
	//               <div className="relative w-full aspect-[2/3]">
	//                 <Image
	//                   src={url}
	//                   alt={`Product image ${index + 1}`}
	//                   fill
	//                   className="object-contain rounded"
	//                   sizes="(max-width: 768px) 100vw, 700px"
	//                 />
	//               </div>
	//             </CarouselItem>
	//           ))}
	//         </CarouselContent>
	//         <CarouselPrevious />
	//         <CarouselNext />
	//       </Carousel>
	//     );
	//   }

	return (
		<PhotoProvider>
			<PhotoView src={preloadedImageUrl}>
				<div className="relative w-full aspect-[2/3] cursor-zoom-in">
					<Image
						src={preloadedImageUrl}
						alt="Product image"
						fill
						className="object-contain rounded"
						sizes="(max-width: 768px) 100vw, 700px"
					/>
				</div>
			</PhotoView>
		</PhotoProvider>
	);
};

export default RenderImages;
