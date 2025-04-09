import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import type { IBanner } from "@/interfaces/banner.interface";

const BannerItem: React.FC<IBanner> = ({
	name,
	product,
	imageUrl,
	description,
}: IBanner) => {
	return (
		<CarouselItem className="basis-full h-[300px] md:h-[400px] bg-[#222] relative">
			<div className="container h-full grid grid-cols-1 items-center">
				{/* Content Section (Left Side) */}
				<div className="w-full flex items-center flex-col justify-center z-10 text-white px-4">
					<h4 className="text-lg mb-2">{name}</h4>
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight text-center max-w-[700px]">
						{description.slice(0, 50)}
					</h1>
					<Link href={`/shop/${product?.id}`}>
						<Button
							variant={"link"}
							className="text-white p-0 group hover:no-underline"
						>
							Shop Now{" "}
							<ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
						</Button>
					</Link>
				</div>
			</div>

			{/* Fallback Image for Mobile */}
			<div className="absolute inset-0 bg-[#222] mix-blend-multiply">
				<Image
					src={imageUrl}
					alt={name}
					fill
					className="object-cover opacity-90"
					style={{
						maskImage: "linear-gradient(to top, transparent 10%, black 60%)",
						WebkitMaskImage:
							"linear-gradient(to top, transparent 10%, black 60%)",
					}}
				/>
			</div>
		</CarouselItem>
	);
};

export default BannerItem;
