import type { ISubcategory } from "@/interfaces/subcategory.interface";
import Link from "next/link";

const SubcategoryListItem: React.FC<{ subcategory: ISubcategory }> = ({
	subcategory,
}) => {
	return (
		<li>
			<Link
				href={`/shop?page=1&limit=24&subcategory=${subcategory?.slug}`}
				className="block hover:bg-[#222] hover:text-white py-2 px-4 hover:scale-[0.94] transition-all duration-75 rounded"
			>
				<span className="text-lg font-normal">{subcategory?.name}</span>
			</Link>
		</li>
	);
};

export default SubcategoryListItem;
