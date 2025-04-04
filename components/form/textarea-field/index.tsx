import React from "react";
import type { Control, FieldValues } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { FormTextareaFieldPropsI } from "./interface";

const FormTextareaField = <T extends FieldValues>({
	form,
	name,
	label,
	loading,
	rows = 10,
	maxLength,
	placeholder,
}: FormTextareaFieldPropsI<T>) => {
	if (loading) {
		return <Skeleton className={`w-full h-${rows * 10}`} />;
	}

	return (
		<FormField
			name={name}
			control={form.control as unknown as Control<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea
							{...field}
							rows={rows}
							placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
							className={cn(form.formState.errors[name] && "input-error")}
							style={{ height: `${rows * 10}px` }}
							maxLength={maxLength}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormTextareaField;
