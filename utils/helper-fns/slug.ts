export const handleTextToSlug = (text: string) =>
	text
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "");
