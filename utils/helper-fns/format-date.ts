export function formatDate(dateString: string, locale = "en-US"): string {
	const date = new Date(dateString);

	return date.toLocaleString(locale, {
		year: "numeric",
		month: "long",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: true, // Change to false for 24-hour format
	});
}

export function formatCompactDate(
	dateString: string,
	locale = "en-US",
): string {
	const date = new Date(dateString);

	return date.toLocaleString(locale, {
		year: "numeric",
		month: "short",
		day: "2-digit",
		hour12: false, // 24-hour format
	});
}
