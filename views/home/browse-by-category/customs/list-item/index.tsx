"use client";

import { Cable } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

import { CarouselItem } from "@/components/ui/carousel";
import type { ISubcategory } from "@/interfaces/subcategory.interface";
import { cn } from "@/lib/utils";

interface PropsI {
	sub: ISubcategory;
	length: number;
}

const ListItem: React.FC<PropsI> = ({ sub, length }) => {
	return (
		<CarouselItem
			className={cn(
				"border p-5 rounded-sm ml-4 hover:bg-accent hover:scale-[0.97] transition-all duration-75",
				length === 2 && "basis-1/2",
				length === 3 && "basis-1/2 sm:basis-1/3",
				length === 4 && "basis-1/2 sm:basis-1/3 md:basis-1/4",
				length === 5 && "basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5",
				length >= 6 &&
					"basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6",
			)}
		>
			<Link
				href={`/shop?page=1&limit=24&subcategory=${sub.slug}`}
				key={sub.id}
				className="w-full block"
			>
				<div className="flex flex-col gap-4 items-center justify-center w-full ">
					{sub.imageUrl ? (
						<Image src={sub.imageUrl} alt={sub.name} width={56} height={56} />
					) : (
						<Cable className="w-12 h-12" />
					)}

					<h4 className="hover:underline">{sub.name}</h4>
				</div>
			</Link>
		</CarouselItem>
	);
};

export default ListItem;
