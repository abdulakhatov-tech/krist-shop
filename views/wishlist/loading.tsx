import ProductCardLoading from "@/components/generics/product-card/loading";

const Loading = () => {
	return Array.from({ length: 5 }).map(() => (
		<ProductCardLoading key={crypto.randomUUID()} />
	));
};

export default Loading;
