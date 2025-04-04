import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface FormTextareaFieldPropsI<T extends FieldValues> {
	form: UseFormReturn<T>;
	placeholder?: string;
	loading?: boolean;
	name: Path<T>;
	label: string;
	rows?: number;
	maxLength?: number;
	onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
