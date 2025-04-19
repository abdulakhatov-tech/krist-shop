import GenericBreadcrumb from "@/components/generics/breadcrumb";
import { shopPageLinks } from "@/utils/mock-data/breadcrumbs";
import {
	FilterByCategory,
	FilterByColor,
	FilterByPrice,
	FilterBySize,
} from "./customs";

const ShopPageView = () => {
	return (
		<section id="shop-page">
			<div className="container">
				<GenericBreadcrumb links={shopPageLinks} />

				<div className="grid grid-cols-[300px_1fr] gap-4">
					<div className="border">
						<FilterByCategory />
						<FilterByPrice />
						<FilterByColor />
						<FilterBySize />
					</div>
					<div className="border">2</div>
				</div>
			</div>
		</section>
	);
};

export default ShopPageView;
