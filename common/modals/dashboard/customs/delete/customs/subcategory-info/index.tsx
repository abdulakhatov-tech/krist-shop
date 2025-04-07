import Image from "next/image";

import { DialogTitle } from "@/components/ui/dialog";
import { useGetSubcategory } from "@/hooks/useQueryActions/useSubcategories";
import noUser from "@/public/no-image.svg";
import Loading from "./loading";

const SubcategoryInfo = ({ subcategoryId }: { subcategoryId: string }) => {
	const { data: category, isLoading } = useGetSubcategory(subcategoryId);

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

export default SubcategoryInfo;
