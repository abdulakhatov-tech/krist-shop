"use client";

import type { Table } from "@tanstack/react-table";
import { isAxiosError } from "axios";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useDeleteCategory } from "@/hooks/useQueryActions/useCategories";
import { useDeleteNewsletter } from "@/hooks/useQueryActions/useNewsletters";
import { useDeleteProduct } from "@/hooks/useQueryActions/useProducts";
import { useDeleteSubcategory } from "@/hooks/useQueryActions/useSubcategories";
import { useDeleteUser } from "@/hooks/useQueryActions/useUsers";

interface PropsI<TData> {
	table: Table<TData>;
}

const useRowActionsAllFeatures = <TData extends { id: string }>({
	table,
}: PropsI<TData>) => {
	const pathname = usePathname();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const { mutateAsync: deleteUser } = useDeleteUser();
	const { mutateAsync: deleteProduct } = useDeleteProduct();
	const { mutateAsync: deleteCategory } = useDeleteCategory();
	const { mutateAsync: deleteSubcategory } = useDeleteSubcategory();
	const { mutateAsync: deleteNewsletter } = useDeleteNewsletter();

	const filteredRows = table.getFilteredSelectedRowModel()?.rows;

	const handleDeleteAll = useCallback(async () => {
		if (filteredRows.length === 0) {
			toast.error("No items selected for deletion.");
			return;
		}

		try {
			setLoading(true);

			let deletionPromises: Promise<string>[] = [];

			if (pathname.includes("users")) {
				deletionPromises = filteredRows.map(
					(row: { original: { id: string } }) => deleteUser(row.original.id),
				);
			}

			if (pathname.includes("products")) {
				deletionPromises = filteredRows.map(
					(row: { original: { id: string } }) => deleteProduct(row.original.id),
				);
			}

			if (pathname.includes("categories")) {
				deletionPromises = filteredRows.map(
					(row: { original: { id: string } }) =>
						deleteCategory(row.original.id),
				);
			}

			if (pathname.includes("subcategories")) {
				deletionPromises = filteredRows.map(
					(row: { original: { id: string } }) =>
						deleteSubcategory(row.original.id),
				);
			}

			if (pathname.includes("newsletters")) {
				deletionPromises = filteredRows.map(
					(row: { original: { id: string } }) =>
						deleteNewsletter(row.original.id),
				);
			}

			// Perform deletions in parallel
			await Promise.all(deletionPromises);

			toast.success(`${filteredRows?.length} Items successfully deleted.`);
		} catch (error) {
			console.error("Error deleting items:", error);
			if (isAxiosError(error)) {
				toast.error("Error deleting items:", {
					description: error.response?.data?.message || "Something went wrong.",
				});
			} else {
				toast.error("Unexpected error occurred while deleting.");
			}
		} finally {
			setLoading(false);
			setOpen(false);
			table.toggleAllRowsSelected(false);
		}
	}, [
		filteredRows,
		deleteUser,
		deleteProduct,
		deleteCategory,
		deleteSubcategory,
		pathname,
		table,
		deleteNewsletter,
	]);

	const filteredRowsLength = filteredRows?.length || 0;

	return { open, setOpen, loading, handleDeleteAll, filteredRowsLength };
};

export default useRowActionsAllFeatures;
