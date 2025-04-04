import type React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const DataTableLoading: React.FC<{ columns: number }> = ({
	columns,
}) => {
	return (
		<Table className="min-w-[800px]">
			<TableHeader>
				<TableRow>
					{Array.from({ length: columns }, () => (
						<TableCell key={crypto.randomUUID()} className="md:py-3">
							<Skeleton className="w-full h-7" />
						</TableCell>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.from({ length: 14 }, () => (
					<TableRow key={crypto.randomUUID()}>
						{Array.from({ length: columns }, () => (
							<TableCell key={crypto.randomUUID()} className="md:py-3">
								<Skeleton className="w-full h-8" />
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export const DataTablePaginationLoading: React.FC = () => (
	<Skeleton className="w-full max-w-[350px] h-8" />
);
export const DataTableLimitLoading: React.FC = () => (
	<Skeleton className="w-[100px] md:w-[130px] h-8" />
);
export const DataTableSelectedRowsCountLoading: React.FC = () => (
	<Skeleton className="w-[100px] md:w-[130px] h-8" />
);
