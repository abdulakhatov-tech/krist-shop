import Image from "next/image";
import type React from "react";

import { cn } from "@/lib/utils";
import noImage from "@/public/no-image.svg";

interface DataTableRowInfoProps {
	row: {
		original: {
			name: string;
			imageUrl: string | null;
		};
	};
}

const DataTableRowInfo: React.FC<DataTableRowInfoProps> = ({ row }) => {
	const product = row.original;

	return (
		<div className="flex items-center gap-2">
			<div
				className={cn(
					!product?.imageUrl && "p-[6px] bg-[#556080]",
					"rounded-full w-[38px] h-[38px] center border-2 shadow-2xl",
				)}
			>
				<Image
					src={product?.imageUrl || noImage}
					alt={product.name}
					width={40}
					height={40}
					className="object-cover rounded-full overflow-hidden"
				/>
			</div>
			<span className="max-w-[10ch] truncate">{product.name || "No name"}</span>
		</div>
	);
};

export default DataTableRowInfo;
