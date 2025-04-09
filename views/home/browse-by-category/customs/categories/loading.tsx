import { Skeleton } from "@/components/ui/skeleton";

import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const Loading = () => {
	return (
		<>
			<Select>
				<SelectTrigger className="w-[200px]">
					<SelectValue placeholder="Selec a category" />
				</SelectTrigger>
				<SelectContent className="max-h-[200px] md:max-h-[250px]">
					{Array.from({ length: 9 }).map(() => (
						<Skeleton
							key={crypto.randomUUID()}
							className="w-full h-[30px] mb-1"
						/>
					))}
				</SelectContent>
			</Select>
		</>
	);
};

export default Loading;
