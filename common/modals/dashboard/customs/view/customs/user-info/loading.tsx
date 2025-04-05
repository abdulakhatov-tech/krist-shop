import { DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const UserInfoLoading = () => {
	return (
		<div>
			<Skeleton className="w-[140px] h-[140px] rounded-full mx-auto mt-2 mb-4" />
			<DialogTitle className="text-center text-xl mb-6">
				<Skeleton className="w-[70%] h-[30px] mx-auto mb-5" />
			</DialogTitle>

			<div className="grid grid-cols-1 gap-4">
				<Skeleton className="w-full h-[26px]" />
				<Skeleton className="w-[95%] h-[26px]" />
				<Skeleton className="w-[90%] h-[26px]" />
				<Skeleton className="w-[85%] h-[26px]" />
				<Skeleton className="w-[80%] h-[26px]" />
			</div>
		</div>
	);
};

export default UserInfoLoading;
