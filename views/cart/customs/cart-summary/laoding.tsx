import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<ul className="flex flex-col gap-4 mb-6">
			<li className="flex items-center justify-between">
				<Skeleton className="h-5 w-[30%]" />
				<span className="flex-grow mt-3 mx-2 border-b border-dashed border-[#cbcbcb]" />
				<Skeleton className="h-5 w-[45%]" />
			</li>
			<li className="flex items-center justify-between">
				<Skeleton className="h-5 w-[40%]" />
				<span className="flex-grow mt-3 mx-2 border-b border-dashed border-[#cbcbcb]" />
				<Skeleton className="h-5 w-[30%]" />
			</li>
			<li className="flex items-center justify-between">
				<Skeleton className="h-5 w-[30%]" />
				<span className="flex-grow mt-3 mx-2 border-b border-dashed border-[#cbcbcb]" />
				<Skeleton className="h-5 w-[40%]" />
			</li>

			<li className="flex items-center justify-between">
				<Skeleton className="h-5 w-[25%]" />
				<span className="flex-grow mt-3 mx-2 border-b border-dashed border-[#cbcbcb]" />
				<Skeleton className="h-5 w-[45%]" />
			</li>
		</ul>
	);
};

export default Loading;
