import { ChartColumnStacked } from "lucide-react";
import type React from "react";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CategoryList from "../category-list";

const CategoryListModal: React.FC = () => {
	return (
		<Dialog>
			<DialogTrigger
				className="block md:hidden absolute top-4 left-4 bg-[#DB4444] p-[6px] rounded-sm"
				title="Categories"
			>
				<ChartColumnStacked className="!w-5 !h-5 text-white" />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Categories</DialogTitle>
				<CategoryList />
			</DialogContent>
		</Dialog>
	);
};

export default CategoryListModal;
