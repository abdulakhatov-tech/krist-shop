import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<>
			{Array.from({ length: 9 }).map(() => (
				<Skeleton key={crypto.randomUUID()} className="w-full h-[40px]" />
			))}
		</>
	);
};

export default Loading;
