export const handleTextToSlug = (text: string) =>
	text
		.toLowerCase()
		.replace(/[&|]/g, "-") // Replace & and | with a dash
		.replace(/\s+/g, "-") // Replace spaces with dashes
		.replace(/[^\w\-]+/g, "") // Remove all non-alphanumeric characters except dashes
		.replace(/-+/g, "-"); // Replace multiple dashes with a single dash
