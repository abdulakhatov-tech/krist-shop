import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

const ProductCardLoading = () => {
	return (
		<div className="border custom-shadow p-2 rounded-[8px]  transition-transform duration-300 ease-in-out transform hover:scale-[0.95] hover:shadow-lg bg-accent hover:bg-gray-50">
			<div className="max-h-[240px] sm:max-h-[245px] w-full overflow-hidden rounded-[6px] border bg-white">
				<Skeleton className="w-full h-[300px]" />
			</div>
			<div className="py-2 flex flex-col gap-2">
				<Skeleton className="w-[90%] h-6 bg-white" />

				<div className="flex items-center gap-1">
					$<Skeleton className="w-20 h-5 bg-white" /> / $
					<Skeleton className="w-20 h-5 bg-white" />
				</div>
				<div className="flex items-center gap-1">
					<Skeleton className="w-full h-5 bg-white" />
					<Skeleton className="w-full h-5 bg-white" />
				</div>

				<div className="flex items-center gap-2">
					<div className="flex items-center">
						{Array.from({ length: 5 }).map(() => (
							<Star
								key={crypto.randomUUID()}
								className="w-5 h-5 fill-[grey] text-[grey]"
							/>
						))}
					</div>
					<Skeleton className="w-10 h-5 bg-white" />
				</div>
			</div>
		</div>
	);
};

export default ProductCardLoading;
