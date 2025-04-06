import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";

const Loading = ({ name }: { name: string }) => {
	return (
		<div className="flex items-center">
			<div className="relative">
				<Skeleton
					className={cn(
						name === "imageUrl" && "rounded-lg",
						name === "profilePhoto" && "rounded-full",
						"object-cover w-[100px] h-[100px] md:w-[120px] md:h-[120px] border border-solid",
					)}
				/>
				<div
					className={cn(
						"flex items-center justify-center absolute bottom-2 -right-3 border w-7 h-7 rounded-full shadow-2xl custom-shadow bg-[#F6F6F6] cursor-pointer p-1",
					)}
				>
					<Camera className={cn("text-[22px] text-[#6C6C6C]")} />
				</div>
			</div>
		</div>
	);
};

export default Loading;
