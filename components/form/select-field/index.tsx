import type { Control, FieldValues } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FormSelectFieldPropsI, ItemWithIdAndNameType } from "./interface";

const FormSelectField = <T extends FieldValues, TItem>({
	form,
	name,
	label,
	items,
	loading,
	placeholder,
	disabled = false,
	getItemValue = (item) => (item as ItemWithIdAndNameType).id,
	getItemLabel = (item) => (item as ItemWithIdAndNameType).name,
}: FormSelectFieldPropsI<T, TItem>) => {
	return (
		<FormField
			name={name}
			control={form.control as unknown as Control<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Select
							value={field.value ?? ""}
							onValueChange={field.onChange}
							disabled={loading || disabled}
						>
							<SelectTrigger
								className={cn(
									form.formState.errors[name] && "input-error",
									"w-full",
								)}
							>
								<SelectValue placeholder={placeholder || label} />
							</SelectTrigger>
							<SelectContent>
								{items?.map((item) => (
									<SelectItem
										key={getItemValue(item)}
										value={getItemValue(item)}
									>
										{getItemLabel(item)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormSelectField;
