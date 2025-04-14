import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Header = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead>Product</TableHead>
				<TableHead>Price</TableHead>
				<TableHead>Quantity</TableHead>
				<TableHead>Subtotal</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default Header;
