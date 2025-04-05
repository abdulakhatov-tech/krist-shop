"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
} from "@/components/ui/dialog";
import { useDeleteProduct } from "@/hooks/useQueryActions/useProducts";
import { useDeleteUser } from "@/hooks/useQueryActions/useUsers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductInfo, UserInfo } from "./customs";

const DeleteModal = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const action = searchParams.get("action");
	const userId = searchParams.get("userId");
	const productId = searchParams.get("productId");

	const isUser = userId && action === "delete";
	const isProduct = productId && action === "delete";

	const { mutateAsync: deleteUser } = useDeleteUser();
	const { mutateAsync: deleteProduct } = useDeleteProduct();

	const handleOpenChange = (state: boolean) => {
		if (!state) {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.delete("userId");
			newParams.delete("productId");
			newParams.delete("action");
			router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		}
	};

	const handleDelete = async () => {
		if (isUser && userId) await deleteUser(userId);
		if (isProduct && productId) await deleteProduct(productId);
		handleOpenChange(false);
	};

	const open = !!isUser || !!isProduct;

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="!pt-10 !max-w-[450px]">
				{isUser && userId && <UserInfo userId={userId} />}
				{isProduct && productId && <ProductInfo productId={productId} />}

				<DialogDescription className="text-center">
					This action cannot be undone. This will permanently remove your data
					from our servers.
				</DialogDescription>

				<div className="flex items-center justify-end gap-2">
					<Button
						onClick={() => handleOpenChange(false)}
						size="lg"
						variant="outline"
					>
						Cancel
					</Button>
					<Button
						onClick={handleDelete}
						size="lg"
						className="hover:bg-[crimson] bg-[#DB4444]"
					>
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteModal;
