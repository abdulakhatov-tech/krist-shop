import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface FormUploadFieldPropsI<T extends FieldValues> {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
	loading?: boolean;
}
