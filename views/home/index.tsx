import BestSellingProducts from "./best-selling-products";
import BrowseByCategory from "./browse-by-category";
import CustomerPromises from "./customer-promises";
import FeaturedProducts from "./featured-products";
import Hero from "./hero";
import NewArrivals from "./new-arrivals";

const HomePageView = () => {
	return (
		<>
			<Hero />
			<BestSellingProducts />
			<BrowseByCategory />
			<NewArrivals />
			<FeaturedProducts />
			<CustomerPromises />
		</>
	);
};

export default HomePageView;
