import { customerPromisesData } from "@/utils/mock-data/customer-promises";
import Image from "next/image";

const CustomerPromises = () => {
	return (
		<section id="customer-promises" className="pt-10 pb-20">
			<div className="container">
				<ul className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
					{customerPromisesData?.map(({ id, title, description, image }) => (
						<li key={id} className="flex flex-col items-center">
							<Image src={image} alt={title} width={80} height={80} />
							<h4 className="mt-6 mb-2 text-xl font-bold leading-7 uppercase text-center">
								{title}
							</h4>
							<p className="text-sm font-normal text-center leading-5">
								{description}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default CustomerPromises;
