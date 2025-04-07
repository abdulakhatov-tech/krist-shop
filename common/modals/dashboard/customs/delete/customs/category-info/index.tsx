import Image from "next/image";

import { DialogTitle } from "@/components/ui/dialog";
import { useGetCategory } from "@/hooks/useQueryActions/useCategories";
import noUser from "@/public/no-image.svg";
import Loading from "./loading";

const CategoryInfo = ({ categoryId }: { categoryId: string }) => {
	const { data: category, isLoading } = useGetCategory(categoryId);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="bg-accent rounded-full w-fit mx-auto p-8">
				<Image
					src={category?.imageUrl || noUser}
					alt={category?.name as string}
					width={category?.imageUrl ? 140 : 100}
					height={category?.imageUrl ? 140 : 100}
				/>
			</div>

			<DialogTitle className="text-xl font-bold text-center">
				{category?.name}
			</DialogTitle>
		</>
	);
};

export default CategoryInfo;
