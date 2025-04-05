import Image from "next/image";

import { DialogTitle } from "@/components/ui/dialog";
import { useGetProduct } from "@/hooks/useQueryActions/useProducts";
import noUser from "@/public/no-user.svg";
import Loading from "./loading";

const UserInfo = ({ productId }: { productId: string }) => {
	const { data: user, isLoading } = useGetProduct(productId);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Image
				src={user?.imageUrl || noUser}
				alt={user?.name as string}
				width={140}
				height={140}
				className="mx-auto"
			/>

			<DialogTitle className="text-xl font-bold text-center">
				{user?.name}
			</DialogTitle>
		</>
	);
};

export default UserInfo;
