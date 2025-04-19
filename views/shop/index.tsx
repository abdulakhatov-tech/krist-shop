"use client";

import { ProductCard } from "@/components/generics";
import GenericBreadcrumb from "@/components/generics/breadcrumb";
import ProductCardLoading from "@/components/generics/product-card/loading";
import type { IProduct } from "@/interfaces/product.interface";
import { shopPageLinks } from "@/utils/mock-data/breadcrumbs";
import { FilterByCategory, FilterByPrice, SortBy } from "./customs";
import useShopProductsFeatures from "./features";

const ShopPageView = () => {
	const { formattedData, isLoading } = useShopProductsFeatures();

	return (
		<section id="shop-page" className="pb-10 md:pb-20">
			<div className="container">
				<GenericBreadcrumb links={shopPageLinks} />

				<div className="grid grid-cols-[260px_1fr] gap-6">
					<div>
						<FilterByCategory />
						<FilterByPrice />
					</div>
					<div className="flex flex-col gap-4">
						<nav className="flex items-center justify-between gap-4">
							<h2>Products</h2>
							<SortBy />
						</nav>

						<div className="grid grid-cols-4 gap-4">
							{isLoading
								? Array.from({ length: 10 }).map(() => (
										<ProductCardLoading key={crypto.randomUUID()} />
									))
								: formattedData?.data?.map((product: IProduct) => (
										<ProductCard key={product.id} product={product} />
									))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ShopPageView;
