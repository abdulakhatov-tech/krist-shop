"use client";

import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";
import { Suspense } from "react";
import Categories from "../categories";

interface PropsI {
	isLoading: boolean;
	slug: string;
}

const Header: React.FC<PropsI> = ({ isLoading, slug }) => {
	return (
		<>
			<div className="flex items-center gap-3 md:gap-4">
				<div className="w-5 h-8 md:h-10 bg-[#DB4444] rounded-[4px]" />
				<h4 className="text-[#DB4444] font-semibold text-lg leading-5">
					Categories
				</h4>
			</div>

			<div className="flex flex-col md:flex-row md:items-center justify-between mt-1 sm:mt-3 md:mt-4 lg:mt-5 mb-3 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10">
				<h2 className="text-xl lg:text-2xl xl:text-4xl font-semibold leading-12 tracking-[4%] flex items-center gap-3">
					Browse By{" "}
					{isLoading ? (
						<Skeleton className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] h-6 md:h-8 lg:h-10 inline-block" />
					) : slug?.length ? (
						slug?.[0].toUpperCase() + slug?.slice(1)
					) : (
						"Category"
					)}
				</h2>

				<div className="flex items-center justify-between gap-18">
					<Suspense fallback={<div>Loading categories</div>}>
						<Categories />
					</Suspense>
					<div className="relative w-[30px] flex items-center gap-10">
						<CarouselPrevious className="right-10 bg-accent" />
						<CarouselNext className="right-0 bg-accent" />
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
