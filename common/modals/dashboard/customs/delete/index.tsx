"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
} from "@/components/ui/dialog";
import { useDeleteCategory } from "@/hooks/useQueryActions/useCategories";
import { useDeleteProduct } from "@/hooks/useQueryActions/useProducts";
import { useDeleteUser } from "@/hooks/useQueryActions/useUsers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryInfo, ProductInfo, UserInfo } from "./customs";

const DeleteModal = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const action = searchParams.get("action");
	const userId = searchParams.get("userId");
	const productId = searchParams.get("productId");
	const categoryId = searchParams.get("categoryId");

	const isUser = userId && action === "delete";
	const isProduct = productId && action === "delete";
	const isCategory = categoryId && action === "delete";

	const { mutateAsync: deleteUser } = useDeleteUser();
	const { mutateAsync: deleteProduct } = useDeleteProduct();
	const { mutateAsync: deleteCategory } = useDeleteCategory();

	const handleOpenChange = (state: boolean) => {
		if (!state) {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.delete("userId");
			newParams.delete("productId");
			newParams.delete("categoryId");
			newParams.delete("action");
			router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		}
	};

	const handleDelete = async () => {
		if (isUser) await deleteUser(userId);
		if (isProduct) await deleteProduct(productId);
		if (isCategory) await deleteCategory(categoryId);

		handleOpenChange(false);
	};

	const open = !!isUser || !!isProduct || !!isCategory;

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="!pt-10 !max-w-[450px]">
				{isUser && <UserInfo userId={userId} />}
				{isProduct && <ProductInfo productId={productId} />}
				{isCategory && <CategoryInfo categoryId={categoryId} />}

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
