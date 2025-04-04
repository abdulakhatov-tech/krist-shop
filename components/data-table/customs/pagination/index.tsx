"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useCallback } from "react";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import type { Table } from "@tanstack/react-table";

interface PropsI<TData> {
	table: Table<TData>;
	pagination: PaginationType;
}

const DataTablePagination = <TData extends object>({
	table,
	pagination,
}: PropsI<TData>) => {
	const { totalPages, currentPage, hasNext, hasPrev } = pagination;
	const router = useRouter();
	const searchParams = useSearchParams();

	// Handle page change
	const handlePageChange = useCallback(
		(newPageIndex: number) => {
			if (
				newPageIndex >= 1 &&
				newPageIndex <= totalPages &&
				newPageIndex !== currentPage
			) {
				const newParams = new URLSearchParams(searchParams.toString());
				newParams.set("page", newPageIndex.toString());
				router.push(`?${newParams.toString()}`, { scroll: false });
				table.setPageIndex(newPageIndex - 1); // Adjusting the page index for your table
			}
		},
		[currentPage, totalPages, searchParams, table, router],
	);

	return (
		<Pagination>
			<PaginationContent>
				{/* Previous Page */}
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={() => handlePageChange(currentPage - 1)}
						className={hasPrev ? "" : "opacity-50 cursor-not-allowed"}
					/>
				</PaginationItem>
				{/* First Page */}
				<PaginationItem>
					<PaginationLink
						href="#"
						onClick={() => handlePageChange(1)}
						isActive={currentPage === 1}
					>
						1
					</PaginationLink>
				</PaginationItem>
				{/* Left Ellipsis */}
				{currentPage > 3 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				{/* Middle Pages */}
				{Array.from({ length: totalPages }, (_, i) => i + 1)
					.filter(
						(page) =>
							page !== 1 &&
							page !== totalPages &&
							Math.abs(page - currentPage) <= 1,
					)
					.map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								href="#"
								onClick={() => handlePageChange(page)}
								isActive={currentPage === page}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}
				{/* Right Ellipsis */}
				{currentPage < totalPages - 2 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				{/* Last Page */}
				{totalPages > 1 && (
					<PaginationItem>
						<PaginationLink
							href="#"
							onClick={() => handlePageChange(totalPages)}
							isActive={currentPage === totalPages}
						>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				)}
				{/* Next Page */}
				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={() => handlePageChange(currentPage + 1)}
						className={hasNext ? "" : "opacity-50 cursor-not-allowed"}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default DataTablePagination;
