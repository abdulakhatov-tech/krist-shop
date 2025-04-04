export const isPhoneNumber = (value: string) =>
	/^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(value);

export const formatPhoneNumber = (value: string) => {
	const digits = value.replace(/\D/g, ""); // Remove non-numeric characters

	if (!digits.startsWith("998")) return value; // If not Uzbek phone, return as is

	let formatted = "+998";
	if (digits.length > 3) formatted += ` (${digits.slice(3, 5)}`;
	if (digits.length > 5) formatted += `) ${digits.slice(5, 8)}`;
	if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;
	if (digits.length > 10) formatted += `-${digits.slice(10, 12)}`;

	return formatted;
};
