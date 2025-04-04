"use client";

import { Trash2 } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Table } from "@tanstack/react-table";
import useRowActionsAllFeatures from "./features";

interface PropsI<TData> {
	table: Table<TData>;
}

const RowActionsAll = <TData extends { id: string }>({
	table,
}: PropsI<TData>) => {
	const { open, setOpen, loading, handleDeleteAll, filteredRowsLength } =
		useRowActionsAllFeatures({ table });

	return (
		<AlertDialog
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (!isOpen) table.toggleAllRowsSelected(false);
			}}
		>
			<AlertDialogTrigger
				onClick={() => setOpen(true)}
				className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 p-2 rounded-md hover:scale-95"
			>
				<Trash2 className="w-4 h-4" />
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl">
						Are you sure you want to delete {filteredRowsLength} items?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action is irreversible. Deleting the selected items will
						permanently remove them from our system.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteAll}
						className="hover:bg-[crimson] bg-[#DB4444]"
						disabled={loading}
					>
						{loading
							? `Deleting (${filteredRowsLength})...`
							: `Delete (${filteredRowsLength}) items`}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default RowActionsAll;
