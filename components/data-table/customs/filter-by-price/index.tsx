"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/utils/helper-fns/format-price";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_PRICE = 99999;
const MIN_PRICE = 0;

const FilterByPrice = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [open, setOpen] = useState<boolean>(false);

	const initialMin = Number.parseInt(
		searchParams.get("minPrice") || MIN_PRICE.toString(),
		10,
	);
	const initialMax = Number.parseInt(
		searchParams.get("maxPrice") || MAX_PRICE.toString(),
		10,
	);

	const [range, setRange] = useState<[number, number]>([
		initialMin,
		initialMax,
	]);

	const updateURLParams = (newRange: [number, number]) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("minPrice", newRange[0].toString());
		params.set("maxPrice", newRange[1].toString());
		router.replace(`${pathname}?${params.toString()}`);
	};

	const onValueChange = (value: [number, number]) => {
		setRange(value);
		updateURLParams(value);
		setOpen(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const parsed = Number.parseInt(value, 10);

		if (Number.isNaN(parsed)) return;

		if (name === "minPrice") {
			const newMin = Math.min(parsed, range[1] - 1); // Prevent overlap
			onValueChange([Math.max(newMin, MIN_PRICE), range[1]]);
		}

		if (name === "maxPrice") {
			const newMax = Math.max(parsed, range[0] + 1); // Prevent overlap
			onValueChange([range[0], Math.min(newMax, MAX_PRICE)]);
		}
	};

	useEffect(() => {
		setRange([initialMin, initialMax]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialMin, initialMax]);

	return (
		<Popover open={open} onOpenChange={(e) => setOpen(!!e)}>
			<PopoverTrigger asChild>
				<Button variant="outline">
					{searchParams.get("minPrice") && searchParams.get("maxPrice") ? (
						<strong className="text-green-600">
							{formatPrice(range[0])} - {formatPrice(range[1])}
						</strong>
					) : (
						"Filter By Price"
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="md:w-[400px] lg:w-[500px] space-y-4">
				<div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 w-full font-semibold">
					<div className="flex items-center w-full gap-1">
						$
						<Input
							type="number"
							name="minPrice"
							value={range[0]}
							onChange={handleInputChange}
							min={MIN_PRICE}
							max={range[1] - 1}
							className="w-full"
						/>
					</div>
					<span className="hidden md:block">-</span>
					<div className="flex items-center w-full gap-1">
						$
						<Input
							type="number"
							name="maxPrice"
							value={range[1]}
							onChange={handleInputChange}
							min={range[0] + 1}
							max={MAX_PRICE}
							className="w-full"
						/>
					</div>
				</div>
				<Slider
					value={range}
					onValueChange={onValueChange}
					min={MIN_PRICE}
					max={MAX_PRICE}
					step={1}
				/>

				<strong className="text-green-600 ml-2 text-center flex items-center justify-center gap-2">
					<span className="hidden md:block text-black">Range:</span>{" "}
					{formatPrice(range[0])} - {formatPrice(range[1])}
				</strong>
			</PopoverContent>
		</Popover>
	);
};

export default FilterByPrice;
