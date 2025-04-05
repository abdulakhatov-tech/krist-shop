import Image from "next/image";

import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useGetProduct } from "@/hooks/useQueryActions/useProducts";
import noImage from "@/public/no-image.svg";
import { Copier } from "@/tools";
import { formatDate } from "@/utils/helper-fns/format-date";
import { formatPrice } from "@/utils/helper-fns/format-price";
import Loading from "./loading";

const ProductInfo = ({ productId }: { productId: string }) => {
	const { data: product, isLoading } = useGetProduct(productId);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div
				className={`mx-auto rounded-full overflow-hidden border ${
					product?.imageUrl ? "" : "p-8"
				}`}
			>
				<Image
					src={product?.imageUrl || noImage}
					alt={product?.name as string}
					width={product?.imageUrl ? 140 : 100}
					height={product?.imageUrl ? 140 : 100}
				/>
			</div>

			<DialogTitle className="text-center text-xl">{product?.name}</DialogTitle>

			<div className="grid grid-cols-1 gap-4">
				<div className="grid grid-cols-2 gap-4">
					<DialogDescription className="flex items-center gap-1">
						<strong>Category:</strong>{" "}
						<span className="hover:text-blue-500">
							<Copier>{product?.category?.name}</Copier>
						</span>
					</DialogDescription>
					<DialogDescription className="flex items-center gap-1">
						<strong>Subcategory:</strong>{" "}
						<span className="hover:text-blue-500">
							<Copier>{product?.subcategory?.name}</Copier>
						</span>
					</DialogDescription>

					<DialogDescription className="flex items-center gap-1">
						<strong>Current Price:</strong>{" "}
						<span className="hover:text-blue-500">
							<Copier>{formatPrice(product?.currentPrice || 0)}</Copier>
						</span>
					</DialogDescription>
					<DialogDescription className="flex items-center gap-1">
						<strong>Original Price:</strong>{" "}
						<span className="hover:text-blue-500">
							<Copier>{formatPrice(product?.originalPrice || 0)}</Copier>
						</span>
					</DialogDescription>
				</div>
				<DialogDescription className="flex items-center gap-1">
					<strong>Created By:</strong>{" "}
					<span className="hover:text-blue-500">
						<Copier>
							{product?.createdBy?.firstName} {product?.createdBy?.lastName}
						</Copier>
					</span>
				</DialogDescription>

				<DialogDescription className="flex items-center gap-1">
					<strong>Created At:</strong>{" "}
					<span className="hover:text-blue-500">
						<Copier>{formatDate(product?.createdAt || "")}</Copier>
					</span>
				</DialogDescription>

				<DialogDescription className="flex flex-col gap-1">
					<strong>Short Description:</strong>{" "}
					<span className="hover:text-blue-500">
						<Copier>{product?.short_description}</Copier>
					</span>
				</DialogDescription>

				<DialogDescription className="flex flex-col gap-1">
					<strong>Long Description:</strong>{" "}
					<span className="hover:text-blue-500">
						<Copier>{product?.description}</Copier>
					</span>
				</DialogDescription>
			</div>
		</>
	);
};

export default ProductInfo;
