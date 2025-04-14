"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
} from "@/components/ui/dialog";
import { useDeleteBanner } from "@/hooks/useQueryActions/useBanners";
import { useDeleteCategory } from "@/hooks/useQueryActions/useCategories";
import { useDeleteNewsletter } from "@/hooks/useQueryActions/useNewsletters";
import { useDeleteProduct } from "@/hooks/useQueryActions/useProducts";
import { useDeleteSubcategory } from "@/hooks/useQueryActions/useSubcategories";
import { useDeleteUser } from "@/hooks/useQueryActions/useUsers";
import { DialogTitle } from "@radix-ui/react-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	BannerInfo,
	CategoryInfo,
	ProductInfo,
	SubcategoryInfo,
	UserInfo,
} from "./customs";

const DeleteModal = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const action = searchParams.get("action");
	const userId = searchParams.get("userId");
	const productId = searchParams.get("productId");
	const categoryId = searchParams.get("categoryId");
	const subcategoryId = searchParams.get("subcategoryId");
	const newsletterId = searchParams.get("newsletterId");
	const bannerId = searchParams.get("bannerId");

	const isUser = userId && action === "delete";
	const isProduct = productId && action === "delete";
	const isCategory = categoryId && action === "delete";
	const isSubcategory = subcategoryId && action === "delete";
	const isNewsLetter = newsletterId && action === "delete";
	const isBanner = bannerId && action === "delete";

	const { mutateAsync: deleteUser } = useDeleteUser();
	const { mutateAsync: deleteProduct } = useDeleteProduct();
	const { mutateAsync: deleteCategory } = useDeleteCategory();
	const { mutateAsync: deleteSubcategory } = useDeleteSubcategory();
	const { mutateAsync: deleteNewsletter } = useDeleteNewsletter();
	const { mutateAsync: deleteBanner } = useDeleteBanner();

	const handleOpenChange = (state: boolean) => {
		if (!state) {
			const newParams = new URLSearchParams(searchParams.toString());
			newParams.delete("userId");
			newParams.delete("productId");
			newParams.delete("categoryId");
			newParams.delete("subcategoryId");
			newParams.delete("newsletterId");
			newParams.delete("bannerId");
			newParams.delete("action");
			router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
		}
	};

	const handleDelete = async () => {
		if (isUser) await deleteUser(userId);
		if (isProduct) await deleteProduct(productId);
		if (isCategory) await deleteCategory(categoryId);
		if (isSubcategory) await deleteSubcategory(subcategoryId);
		if (isNewsLetter) await deleteNewsletter(newsletterId);
		if (isBanner) await deleteBanner(bannerId);

		handleOpenChange(false);
	};

	const open =
		!!isUser ||
		!!isProduct ||
		!!isCategory ||
		!!isSubcategory ||
		!!isNewsLetter ||
		!!isBanner;

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="!pt-10 !max-w-[450px]">
				{isUser && <UserInfo userId={userId} />}
				{isProduct && <ProductInfo productId={productId} />}
				{isCategory && <CategoryInfo categoryId={categoryId} />}
				{isSubcategory && <SubcategoryInfo subcategoryId={subcategoryId} />}
				{isNewsLetter && (
					<DialogTitle>Unsubscribe user from Newsletter</DialogTitle>
				)}
				{isBanner && <BannerInfo bannerId={bannerId} />}

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
						className="hover:bg-[#DB4444] bg-[#DB4444]"
					>
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteModal;
