import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type ItemWithIdAndNameType = {
	id: string;
	name: string;
};

export interface FormSelectFieldPropsI<T extends FieldValues, TItem> {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	items: TItem[];
	loading?: boolean;
	getItemValue?: (item: TItem) => string;
	getItemLabel?: (item: TItem) => string;
	disabled?: boolean;
}
