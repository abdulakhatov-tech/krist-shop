"use client";

import Image from "next/image";
import type React from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import type { ICart } from "@/interfaces/cart.interface";
import { formatPrice } from "@/utils/helper-fns/format-price";
import CartTableActions from "../actions";

const CartItem: React.FC<ICart> = ({ product, quantity }) => {
	return (
		<TableRow>
			<TableCell>
				<div className="flex items-center gap-3">
					<Image
						src={product?.imageUrl}
						alt={product.name}
						width={54}
						height={54}
						className="rounded-md"
					/>
					<h4 className="max-w-[30ch] md:max-w-[40ch] truncate">
						{product.name}
					</h4>
				</div>
			</TableCell>
			<TableCell>${product.currentPrice}</TableCell>
			<TableCell>{quantity}x</TableCell>
			<TableCell>{formatPrice(quantity * product.currentPrice)}</TableCell>
			<TableCell className="text-right">
				<CartTableActions product={product} />
			</TableCell>
		</TableRow>
	);
};

export default CartItem;
