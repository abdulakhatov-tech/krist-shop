"use client";

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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { Control, FieldValues } from "react-hook-form";
import useInputFieldFeatures from "./features";
import type { FormInputFieldPropsI } from "./interface";

// Updated type for form values
const FormInputField = <T extends FieldValues>({
	form,
	name,
	label,
	loading,
	onChange,
	placeholder,
	disabled,
	type = "text",
}: FormInputFieldPropsI<T>) => {
	// State for controlling password visibility (text or password type)
	const [text, setText] = useState(type);

	// Destructure custom hook logic
	const { onChangeHandler } = useInputFieldFeatures({
		onChange,
		name,
	});

	if (loading) {
		return <Skeleton className="w-full h-10" />;
	}

	const handleToggleVisibility = () => {
		setText((prev) => (prev === "password" ? "text" : "password"));
	};

	return (
		<FormField
			name={name}
			control={form.control as unknown as Control<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div className="relative">
							{/* Input field with dynamic type and error handling */}
							<Input
								{...field}
								type={text} // Controlled by the `text` state (password or text)
								onChange={(e) => onChangeHandler(e, field)} // onChange is handled by the custom hook
								placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
								className={cn(form.formState.errors[name] && "input-error")}
								disabled={disabled}
							/>

							{/* Password visibility toggle */}
							{type === "password" && (
								<div
									onClick={handleToggleVisibility}
									onKeyUp={(e) => e.key === "Enter" && handleToggleVisibility()}
									onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
									className="absolute top-[50%] right-3 -translate-y-[50%] cursor-pointer text-muted-foreground"
								>
									{text === "password" ? <EyeOff /> : <Eye />}
								</div>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormInputField;
