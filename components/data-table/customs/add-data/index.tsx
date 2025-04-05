import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const DataTableAddData = ({ loading = false }: { loading: boolean }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Function to generate a new URL with preserved query params
	const generateUrl = () => {
		const params = searchParams
			? new URLSearchParams(searchParams.toString())
			: new URLSearchParams(); // Clone to modify
		params.set("action", "add");

		if (pathname === "/dashboard/users") {
			params.set("action-type", "user");
		} else if (pathname === "/dashboard/products") {
			params.set("action-type", "product");
		}

		return `${pathname}?${params.toString()}`;
	};

	if (loading) return <Skeleton className="w-9 h-9" />;

	return (
		<Link href={generateUrl()}>
			<Button
				size="sm"
				className={
					"hover:scale-95 bg-[#001529] hover:bg-blue-700 active:bg-blue-800"
				}
			>
				<Plus />
			</Button>
		</Link>
	);
};

export default DataTableAddData;
