"use client";

import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Header = () => {
	return (
		<>
			<div className="flex items-center gap-3 md:gap-4">
				<div className="w-5 h-8 md:h-10 bg-[#DB4444] rounded-[4px]" />
				<h4 className="text-[#DB4444] font-semibold text-lg leading-5">
					New Products
				</h4>
			</div>

			<div className="flex flex-row md:items-center justify-between mt-1 sm:mt-3 md:mt-4 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
				<h2 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-semibold leading-12 tracking-[4%] flex items-center gap-3">
					New Arrivals
				</h2>

				<div className="relative flex items-center justify-between shrink-0 w-[30px]">
					<CarouselPrevious className="right-10 bg-accent" />
					<CarouselNext className="right-0 bg-accent" />
				</div>
			</div>
		</>
	);
};

export default Header;
