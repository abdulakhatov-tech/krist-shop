import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
	return (
		<section id="product-details-view" className="pb-8">
			<div className="container">
				<Skeleton className="w-[240px] h-8 my-4" />

				<div className="grid md:grid-cols-2 gap-6 md:gap-8">
					<Skeleton className="min-w-[200px] md:min-w-[300px] h-full min-h-[400px]" />

					<div className="flex flex-col gap-3">
						<Skeleton className="w-[80%] h-8" />
						<Skeleton className="w-[100%] h-6" />
						<Skeleton className="w-[50%] h-10" />
						<Skeleton className="w-[100%] h-5" />
						<Skeleton className="w-[90%] h-5" />
						<Skeleton className="w-[80%] h-5" />
						<Separator />
						<Skeleton className="w-full h-8" />
						<Skeleton className="w-full h-8" />
						<div className="flex items-center gap-2">
							<Skeleton className="w-full h-8" />
							<Skeleton className="w-full h-8" />
							<Skeleton className="w-full h-8" />
						</div>
						<Skeleton className="w-full h-20" />
						<Skeleton className="w-full h-20" />
					</div>
				</div>
				<div className="flex flex-col gap-3 w-full pt-6">
					<Skeleton className="w-[100%] h-5" />
					<Skeleton className="w-[90%] h-5" />
					<Skeleton className="w-[80%] h-5" />
					<Skeleton className="w-[70%] h-5" />
				</div>
			</div>
		</section>
	);
};

export default Loading;
