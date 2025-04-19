"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/utils/helper-fns/format-price";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const MAX_PRICE = 99999;
const MIN_PRICE = 0;

const FilterByPrice = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const initialMin = Number.parseInt(searchParams.get("minPrice") || "0", 10);
	const initialMax = Number.parseInt(
		searchParams.get("maxPrice") || "99999",
		10,
	);

	const [range, setRange] = useState<[number, number]>([
		initialMin,
		initialMax,
	]);
	const [isPending, startTransition] = useTransition();

	const debouncedSetRange = debounce((value: number[]) => {
		setRange([value[0], value[1]]);
	}, 100);

	const applyFilter = () => {
		startTransition(() => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("minPrice", range[0].toString());
			params.set("maxPrice", range[1].toString());
			router.replace(`${pathname}?${params.toString()}`);
		});
	};

	return (
		<div className="pb-4">
			<h3 className="text-xl font-semibold mb-3">Filter By Price</h3>

			<Slider
				value={range}
				onValueChange={(value) => debouncedSetRange(value)}
				min={MIN_PRICE}
				max={MAX_PRICE}
				step={1}
			/>

			<h4 className="text-black mt-2 text-[16px] font-semibold">
				Price: {formatPrice(range[0])} - {formatPrice(range[1])}
			</h4>

			<Button onClick={applyFilter} disabled={isPending} className="mt-2">
				{isPending ? "Applying..." : "Apply"}
			</Button>
		</div>
	);
};

export default FilterByPrice;
