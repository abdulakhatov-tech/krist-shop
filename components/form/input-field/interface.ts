import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface FormInputFieldPropsI<T extends FieldValues> {
	form: UseFormReturn<T>;
	name: Path<T>;
	label: string;
	loading?: boolean;
	placeholder?: string;
	type?: "text" | "password" | "number" | "color";
	onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
}
