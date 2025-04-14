import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { IProduct } from "@/interfaces/product.interface";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCartTableActionFeatures from "./features";

const CartTableActions = ({ product }: { product: IProduct }) => {
	const {
		handleRemoveItem,
		handleIncrementItemQuantity,
		handleDecrementItemQuantity,
	} = useCartTableActionFeatures();

	return (
		<div className="flex justify-end gap-1">
			<Button
				variant="outline"
				size="icon"
				onClick={() => handleDecrementItemQuantity(product?.id)}
				aria-label="Decrease quantity"
			>
				<Minus size={16} />
			</Button>

			<Button
				variant="outline"
				size="icon"
				onClick={() => handleIncrementItemQuantity(product?.id)}
				aria-label="Increase quantity"
			>
				<Plus size={16} />
			</Button>

			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button className="bg-[#DB4444]" size="icon" aria-label="Remove item">
						<Trash2 size={16} />
					</Button>
				</AlertDialogTrigger>

				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Remove{" "}
							{product?.name ? (
								<span className="text-blue-500">{product?.name}</span>
							) : (
								"item"
							)}{" "}
							from cart?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to remove this item from your cart? This
							action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => handleRemoveItem(product?.id)}
							className="bg-[#DB4444]"
						>
							Remove
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default CartTableActions;
