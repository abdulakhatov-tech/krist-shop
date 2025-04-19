import { Skeleton } from "@/components/ui/skeleton";

export const CategoryLoading = () => {
	return (
		<div className="flex flex-col gap-1 px-2">
			{Array.from({ length: 10 }).map(() => (
				<Skeleton key={crypto.randomUUID()} className="w-full h-10" />
			))}
		</div>
	);
};

export const SubcategoryLoading = () => {
	return (
		<div className="flex flex-col gap-1 p-2">
			{Array.from({ length: 4 }).map(() => (
				<Skeleton key={crypto.randomUUID()} className="w-full h-8" />
			))}
		</div>
	);
};
