import type { ISubcategory } from "@/interfaces/subcategory.interface";
import SubcategoryListItem from "./subcategory-list-item";

const SubCategoryList: React.FC<{ subcategories: ISubcategory[] }> = ({
	subcategories,
}) => {
	return (
		<ul>
			{subcategories.map((subcategory) => (
				<SubcategoryListItem key={subcategory?.id} subcategory={subcategory} />
			))}
		</ul>
	);
};

export default SubCategoryList;
