import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

// Type for API error responses
export interface ApiErrorResponse {
	message?: string;
	errors?: Record<string, string[] | string>;
}

// Extracts error message from various error types
export function getErrorMessage(error: unknown): string {
	if (typeof error === "string") return error;
	if (error instanceof Error) return error.message;
	if (isApiErrorResponse(error))
		return error.message || "An unknown error occurred";
	return "An unknown error occurred";
}

// Type guard for ApiErrorResponse
function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
	return (
		typeof error === "object" &&
		error !== null &&
		("message" in error || "errors" in error)
	);
}

// Handles form field errors from API response
export function handleFormErrors<T extends FieldValues>(
	errors: Record<string, string[] | string>,
	setError: UseFormSetError<T>,
) {
	for (const [field, messages] of Object.entries(errors)) {
		const errorMessage = normalizeErrorMessage(messages);
		setError(field as Path<T>, {
			type: "manual",
			message: errorMessage,
		});
	}
}

// Normalizes error messages from API to string
function normalizeErrorMessage(messages: string[] | string): string {
	return Array.isArray(messages)
		? messages.join(", ")
		: typeof messages === "string"
			? messages
			: "Invalid value";
}
