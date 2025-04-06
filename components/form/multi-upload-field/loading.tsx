import { Skeleton } from "@/components/ui/skeleton";
import { Camera } from "lucide-react";

const Loading = () => {
	const skeletons = new Array(4).fill(null);

	return (
		<div className="flex space-x-4">
			{skeletons.map(() => (
				<div className="relative" key={crypto.randomUUID()}>
					<Skeleton className="object-cover rounded-lg w-[100px] h-[100px] md:w-[120px] md:h-[120px] border border-solid" />
					<div className="flex items-center justify-center absolute bottom-2 -right-3 border w-7 h-7 rounded-full shadow-2xl custom-shadow bg-[#F6F6F6] cursor-pointer p-1">
						<Camera className="text-[22px] text-[#6C6C6C]" />
					</div>
				</div>
			))}
		</div>
	);
};

export default Loading;
