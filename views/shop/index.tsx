import GenericBreadcrumb from "@/components/generics/breadcrumb";
import { shopPageLinks } from "@/utils/mock-data/breadcrumbs";
import { FilterByCategory, FilterByPrice, SortBy } from "./customs";

const ShopPageView = () => {
	return (
		<section id="shop-page" className="pb-10 md:pb-20">
			<div className="container">
				<GenericBreadcrumb links={shopPageLinks} />

				<div className="grid grid-cols-[300px_1fr] gap-4">
					<div>
						<FilterByCategory />
						<FilterByPrice />
					</div>
					<div className="border">
						<nav className="flex items-center justify-between gap-4">
							<h2>Products</h2>
							<SortBy />
						</nav>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ShopPageView;
