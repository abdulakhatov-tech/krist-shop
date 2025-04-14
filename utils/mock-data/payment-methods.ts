import { BanknoteArrowDown, CreditCard } from "lucide-react";

export enum PaymentMethodValue {
	CASH = "cash",
	PAYME = "payme",
	CLICK = "click",
}

export interface IPaymentMethod {
	id: string;
	value: PaymentMethodValue;
	title: string;
	description: string;
	Icon: React.ElementType;
}

export const paymentMethods: IPaymentMethod[] = [
	{
		id: "1",
		value: PaymentMethodValue.CASH,
		title: "Cash on Delivery",
		description: "Pay with cash upon delivery",
		Icon: BanknoteArrowDown,
	},
	{
		id: "2",
		value: PaymentMethodValue.PAYME,
		title: "Payme",
		description: "Pay using the Payme app",
		Icon: CreditCard,
	},
	{
		id: "3",
		value: PaymentMethodValue.CLICK,
		title: "Click",
		description: "Pay through Click payment system",
		Icon: CreditCard,
	},
];
