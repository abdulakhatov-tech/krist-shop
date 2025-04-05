export const formatPrice = (price: number | string) => {
	const numericPrice =
		typeof price === "string" ? Number.parseFloat(price) : price;

	if (Number.isNaN(numericPrice)) return "$0.00";

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(numericPrice);
};
