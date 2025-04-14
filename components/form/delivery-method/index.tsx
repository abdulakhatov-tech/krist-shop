"use client";

import { type FieldValues, useController } from "react-hook-form";

import MethodOption from "@/components/generics/delivery-method";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import type { IDeliveryMethod } from "@/utils/mock-data/delivery-methods";
import type { IPaymentMethod } from "@/utils/mock-data/payment-methods";
import type { FormDeliveryMethodFieldPropsI } from "./interface";

const FormDeliveryMethod = <T extends FieldValues>({
	form,
	name,
	loading,
	items,
}: FormDeliveryMethodFieldPropsI<T>) => {
	const {
		fieldState: { error },
	} = useController({
		control: form.control,
		name,
	});

	if (loading) {
		return <div className="w-full h-40 bg-gray-200 animate-pulse" />;
	}

	return (
		<FormField
			name={name}
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<RadioGroup
							value={field.value}
							onValueChange={field.onChange}
							className="grid md:grid-cols-3 gap-4 h-full"
						>
							{items?.map((method: IDeliveryMethod | IPaymentMethod) => (
								<MethodOption
									key={method.id}
									{...method}
									isSelected={field.value === method.value}
								/>
							))}
						</RadioGroup>
					</FormControl>
					{error && <FormMessage>{error.message}</FormMessage>}
				</FormItem>
			)}
		/>
	);
};

export default FormDeliveryMethod;
