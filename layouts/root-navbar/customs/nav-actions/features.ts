"use client";

import { useRouter, useSearchParams } from "next/navigation";

const useNavActionsFeatures = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleClick = (type: "search" | "favorites" | "shopping-cart") => {
		const params = new URLSearchParams(searchParams.toString());

		if (type === "search") {
			// Toggle search params
			if (params.has("search")) {
				params.delete("search");
			} else {
				params.set("search", "");
			}

			router.push(`?${params.toString()}`, { scroll: false });
		}
	};

	return { handleClick };
};

export default useNavActionsFeatures;
