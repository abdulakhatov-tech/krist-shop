"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const Loading = () => {
	return Array.from({ length: 7 }).map(() => (
		<TableRow key={crypto.randomUUID()}>
			{Array.from({ length: 5 }).map(() => (
				<TableCell key={crypto.randomUUID()}>
					<Skeleton className="w-full h-10" />
				</TableCell>
			))}
		</TableRow>
	));
};

export default Loading;
