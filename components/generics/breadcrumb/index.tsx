import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export interface BreadcrumbLinkItem {
	id: string;
	title: string;
	path?: string;
	isActive?: boolean;
}

interface GenericBreadcrumbProps {
	links: BreadcrumbLinkItem[];
}

const GenericBreadcrumb: React.FC<GenericBreadcrumbProps> = ({ links }) => {
	if (!links?.length) return null;

	return (
		<Breadcrumb>
			<BreadcrumbList className="py-6 flex items-center gap-2">
				{links.map((item, index) => (
					<React.Fragment key={item.id}>
						<BreadcrumbItem>
							{item.isActive ? (
								<BreadcrumbPage>{item.title}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={item.path}>{item.title}</BreadcrumbLink>
							)}
						</BreadcrumbItem>

						{index < links.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default GenericBreadcrumb;
