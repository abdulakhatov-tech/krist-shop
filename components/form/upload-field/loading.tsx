import { Skeleton } from "@/components/ui/skeleton";
import { Camera } from "lucide-react";

const Loading = () => {
	return (
		<div className="flex items-center">
			<div className="relative">
				<Skeleton className="object-cover rounded-full w-[100px] h-[100px] md:w-[120px] md:h-[120px] border border-solid" />
				<div className="flex items-center justify-center absolute -right-0 bottom-1 z-10 w-7 h-7 rounded-full overflow-hidden bg-[#F6F6F6] custom-shadow">
					<Camera className="text-[22px] text-[#6C6C6C]" />
				</div>
			</div>
		</div>
	);
};

export default Loading;
