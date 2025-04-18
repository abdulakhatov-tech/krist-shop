import Image from "next/image";

import GenericBreadcrumb from "@/components/generics/breadcrumb";
import { aboutStatistics } from "@/utils/mock-data/about";
import { aboutPageLinks } from "@/utils/mock-data/breadcrumbs";
import CustomerPromises from "@/views/home/customer-promises";

const About = () => {
	return (
		<>
			<section id="about-intro" className="pb-5 md:pb-10">
				<div className="container">
					<GenericBreadcrumb links={aboutPageLinks} />

					<div className="flex flex-col md:flex-row items-center gap-4">
						<div className="flex flex-col gap-6 flex-1/2">
							<h1 className="text-[54px] font-semibold leading-[64px] tracking-[6%]">
								Our Story
							</h1>
							<p className="text-[16px] font-normal leading-[26px]">
								Launced in 2015, Exclusive is South Asia’s premier online
								shopping makterplace with an active presense in Bangladesh.
								Supported by wide range of tailored marketing, data and service
								solutions, Exclusive has 10,500 sallers and 300 brands and
								serves 3 millioons customers across the region.
							</p>
							<p className="text-[16px] font-normal leading-[26px]">
								Exclusive has more than 1 Million products to offer, growing at
								a very fast. Exclusive offers a diverse assotment in categories
								ranging from consumer.
							</p>
						</div>

						<div className="relative flex-1/2 h-[400px]">
							<Image
								src={"/about-intro.png"}
								alt="image"
								fill
								className="object-contain"
							/>
						</div>
					</div>
				</div>
			</section>

			<section id="about-statistics" className="py-5 md:py-10">
				<div className="container">
					<ul className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
						{aboutStatistics?.map(({ id, Icon, title, description }) => (
							<li
								key={id}
								className="p-[30px] border hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white flex flex-col gap-3 items-center"
							>
								<div className="p-2 rounded-full bg-accent">
									<Icon className="bg-black text-white rounded-full p-[6px] w-9 h-9" />
								</div>
								<h4 className="text-[32px] font-bold leading-[30px] tracking-[4%]">
									{title}
								</h4>
								<p className="text-[16px] leadig-[24px]">{description}</p>
							</li>
						))}
					</ul>
				</div>
			</section>
			<CustomerPromises />
		</>
	);
};

export default About;
