"use client";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { IDeliveryMethod } from "@/utils/mock-data/delivery-methods";
import type { IPaymentMethod } from "@/utils/mock-data/payment-methods";
import type { FC } from "react";

const MethodOption: FC<
	(IDeliveryMethod | IPaymentMethod) & { isSelected: boolean }
> = ({ title, value, Icon, description, isSelected }) => (
	<div className="relative h-full">
		<Label htmlFor={value} className="block cursor-pointer transition-shadow">
			<Card
				className={cn(
					"w-full rounded-lg transition-colors",
					// Conditionally apply styles based on the selected state
					isSelected ? "bg-black text-white" : "bg-white text-black",
				)}
			>
				<CardHeader>
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<Icon />
							<CardTitle>{title}</CardTitle>
						</div>
						<RadioGroupItem value={value} id={value} className="bg-white" />
					</div>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
			</Card>
		</Label>
	</div>
);

export default MethodOption;
