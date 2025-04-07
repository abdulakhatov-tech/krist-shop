import Image from "next/image";

import { DialogTitle } from "@/components/ui/dialog";
import { useGetProduct } from "@/hooks/useQueryActions/useProducts";
import noUser from "@/public/no-image.svg";
import Loading from "./loading";

const UserInfo = ({ productId }: { productId: string }) => {
	const { data: product, isLoading } = useGetProduct(productId);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="bg-accent rounded-full w-fit mx-auto p-8">
				<Image
					src={product?.imageUrl || noUser}
					alt={product?.name as string}
					width={product?.imageUrl ? 140 : 100}
					height={product?.imageUrl ? 140 : 100}
				/>
			</div>

			<DialogTitle className="text-xl font-bold text-center">
				{product?.name}
			</DialogTitle>
		</>
	);
};

export default UserInfo;
