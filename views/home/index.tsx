import BrowseByCategory from "./browse-by-category";
import CustomerPromises from "./customer-promises";
import Hero from "./hero";

const HomePageView = () => {
	return (
		<>
			<Hero />
			<BrowseByCategory />
			<CustomerPromises />
		</>
	);
};

export default HomePageView;
