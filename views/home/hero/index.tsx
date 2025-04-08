import Banners from "./banners";
import CategoryList from "./category-list";

const Hero = () => {
	return (
		<section id="hero" className="pt-4 md:pt-8 pb-4">
			<div className="container">
				<div className="grid md:grid-cols-[260px_1fr] gap-2">
					{/* Category list */}
					<div className="hidden md:block">
						<CategoryList />
					</div>

					{/* Banners */}
					<Banners />
				</div>
			</div>
		</section>
	);
};

export default Hero;
