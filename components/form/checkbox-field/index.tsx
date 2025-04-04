import React from "react";
import type { Control, FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import type { FormCheckboxFieldPropsI } from "./interface";

const FormCheckboxField = <T extends FieldValues>({
	form,
	name,
	label,
	loading = false,
	direction = "horizontal",
}: FormCheckboxFieldPropsI<T>) => {
	return (
		<FormField
			name={name}
			control={form.control as unknown as Control<T>}
			render={({ field }) => {
				if (direction === "vertical") {
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<FormControl>
							{loading ? (
								<Skeleton className="w-5 h-5" />
							) : (
								<Checkbox
									{...field}
									checked={field.value}
									onCheckedChange={field.onChange}
									className="w-5 h-5"
								/>
							)}
						</FormControl>
						<FormMessage />
					</FormItem>;
				}

				return (
					<FormItem>
						<div className="flex items-center space-x-2">
							<FormControl>
								{loading ? (
									<Skeleton className="w-5 h-5" />
								) : (
									<Checkbox
										{...field}
										checked={field.value}
										onCheckedChange={field.onChange}
										className="w-5 h-5"
									/>
								)}
							</FormControl>
							<FormLabel>{label}</FormLabel>
						</div>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};

export default FormCheckboxField;
