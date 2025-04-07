import { DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<div>
			<Skeleton className="w-[120px] md:w-[140px] h-[140px] rounded-full mx-auto mt-2 mb-4" />
			<DialogTitle className="text-center text-xl mb-6">
				<Skeleton className="w-[70%] h-[30px] mx-auto mb-5" />
			</DialogTitle>
		</div>
	);
};

export default Loading;
