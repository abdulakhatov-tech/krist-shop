import type { Control, FieldValues } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import useInputFieldFeatures from "./features";
import type { FormInputFieldPropsI } from "./interface";

const FormInputField = <T extends FieldValues>({
	form,
	name,
	label,
	loading,
	onChange,
	placeholder,
	type = "text",
}: FormInputFieldPropsI<T>) => {
	const { onChangeHandler } = useInputFieldFeatures({
		onChange,
		name,
	});

	if (loading) {
		return <Skeleton className="w-full h-10" />;
	}

	return (
		<FormField
			name={name}
			control={form.control as unknown as Control<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							{...field}
							type={type}
							onChange={(e) => onChangeHandler(e, field)}
							placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
							className={cn(form.formState.errors[name] && "input-error")}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormInputField;
