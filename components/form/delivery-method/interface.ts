import type { IDeliveryMethod } from "@/utils/mock-data/delivery-methods";
import type { IPaymentMethod } from "@/utils/mock-data/payment-methods";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface FormDeliveryMethodFieldPropsI<T extends FieldValues> {
	form: UseFormReturn<T>;
	loading?: boolean;
	name: Path<T>;
	label?: string;
	onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
	items: IDeliveryMethod[] | IPaymentMethod[];
}
