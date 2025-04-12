import { Eye, Heart, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { toast } from "sonner";

import type { IProduct } from "@/interfaces/product.interface";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const ActionButtons: FC<{
	product: IProduct;
}> = ({ product }) => {
	const isWishlist = true;
	const router = useRouter();
	const isAuthenticated = useAuthHeader();

	const handleWishlist = () => {
		if (!isAuthenticated) {
			router.push("/auth/sign-in");
		}

		toast.success(product.name, {
			description: "Added to Wishlist",
		});
	};

	const handleAddToCart = () => {
		if (!isAuthenticated) {
			router.push("/auth/sign-in");
		}

		toast.success(product.name, {
			description: "Added to Cart",
		});
	};

	return (
		<div className="absolute top-2 right-2 z-10 flex flex-col gap-1 cursor-pointer">
			<div
				onClick={handleWishlist}
				onKeyUp={(e) => e.code === "Enter" && handleWishlist()}
				onKeyDown={(e) => e.code === "Enter" && handleWishlist()}
				className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-[orange] center custom-shadow hover:bg-orange active:bg-orange text-white"
			>
				{isWishlist ? (
					<Heart className="text-[16px] md:text-[18px] text-crimson" />
				) : (
					<Heart className="text-[18px] md:text-[20px] text-white" />
				)}
			</div>
			<div
				onClick={handleAddToCart}
				onKeyUp={(e) => e.code === "Enter" && handleAddToCart()}
				onKeyDown={(e) => e.code === "Enter" && handleAddToCart()}
				className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-[orange] center custom-shadow hover:bg-orange active:bg-orange text-white"
			>
				<ShoppingBasket className="text-[16px] md:text-[18px] " />
			</div>
			<Link href={`/products/details/${product.id}`}>
				<div className="w-7 md:w-8 h-7 md:h-8 rounded-full bg-[orange] center custom-shadow hover:bg-orange active:bg-orange text-white">
					<Eye className="text-[16px] md:text-[18px] " />
				</div>
			</Link>
		</div>
	);
};

export default ActionButtons;
