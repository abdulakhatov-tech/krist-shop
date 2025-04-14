"use client";

import { formatPrice } from "@/utils/helper-fns/format-price";
import type React from "react";

interface IProps {
	label: string;
	isTotal?: boolean;
	value: string | number;
}

// PriceDetail Component for DRY Code
const PriceDetail: React.FC<IProps> = ({ label, value, isTotal = false }) => (
	<li className="flex">
		<h5 className="text-[14px] md:text-[16px] font-medium text-gray">
			{label}:
		</h5>
		<span className="flex-grow mx-2 border-b border-dashed border-[#cbcbcb]" />
		<h5
			className={`text-[14px] md:text-[16px] font-semibold ${
				isTotal ? "text-secondary-black" : "text-secondary-black"
			}`}
		>
			{typeof value === "number" ? formatPrice(value) : value}
		</h5>
	</li>
);

export default PriceDetail;
