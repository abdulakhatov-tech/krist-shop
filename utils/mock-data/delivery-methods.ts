import { HandCoins, Mail, Truck } from "lucide-react";

export enum DeliveryMethodValue {
	COURIER = "courier",
	PICK_UP = "pickup",
	POSTAL = "postal",
}

export interface IDeliveryMethod {
	id: string;
	value: DeliveryMethodValue;
	title: string;
	description: string;
	Icon: React.ElementType;
}

export const deliveryMethods: IDeliveryMethod[] = [
	{
		id: "1",

		value: DeliveryMethodValue.PICK_UP,
		title: "In-Store Pickup",
		description: "Pick up your order from our nearest store location.",
		Icon: HandCoins,
	},
	{
		id: "2",
		value: DeliveryMethodValue.COURIER,
		title: "Courier Delivery",
		description: "Fast and reliable delivery right to your doorstep.",
		Icon: Truck,
	},
	{
		id: "3",
		value: DeliveryMethodValue.POSTAL,
		title: "Postal Service",
		description: "Get your package delivered via trusted postal services.",
		Icon: Mail,
	},
];
