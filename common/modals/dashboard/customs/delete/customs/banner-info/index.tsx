import Image from "next/image";

import { DialogTitle } from "@/components/ui/dialog";
import { useGetBanner } from "@/hooks/useQueryActions/useBanners";
import noImage from "@/public/no-image.svg";
import Loading from "./loading";

const BannerInfo = ({ bannerId }: { bannerId: string }) => {
	const { data: banner, isLoading } = useGetBanner(bannerId);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className="bg-accent rounded-full w-fit mx-auto p-8">
				<Image
					src={banner?.imageUrl || noImage}
					alt={banner?.name as string}
					width={banner?.imageUrl ? 140 : 100}
					height={banner?.imageUrl ? 140 : 100}
				/>
			</div>

			<DialogTitle className="text-xl font-bold text-center">
				{banner?.name}
			</DialogTitle>
		</>
	);
};

export default BannerInfo;
