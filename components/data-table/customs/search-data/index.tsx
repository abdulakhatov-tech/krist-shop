"use client";

import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const SearchData = ({ loading = false }: { loading?: boolean }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState(
		searchParams.get("search") || "",
	);
	const inputRef = useRef<HTMLInputElement>(null);

	// Function to validate search input (only letters, numbers, and spaces)
	const isValidSearch = (value: string) => /^[a-zA-Z0-9 ]*$/.test(value);

	// Debounced search function
	const debouncedSearch = debounce((value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value.trim()) {
			params.set("search", value);
		} else {
			params.delete("search");
		}

		router.replace(`?${params.toString()}`);
	}, 600);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if (isValidSearch(value)) {
			setSearchValue(value);
			debouncedSearch(value);
		} else {
			console.log(
				"Invalid input! Only letters, numbers, and spaces are allowed.",
			);
		}
	};

	// Update searchValue when URL search changes
	useEffect(() => {
		setSearchValue(searchParams.get("search") || "");
	}, [searchParams]);

	// **Ensure input gets focus when it has a value**
	useEffect(() => {
		if (searchValue.trim() !== "" && inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 10); // Delay to ensure React updates the DOM before focusing
		}
	}, [searchValue]);

	useEffect(() => {
		return () => {
			debouncedSearch.cancel(); // Cancel the debounce on unmount
		};
	}, [debouncedSearch]);

	if (loading) {
		return <Skeleton className="w-[350px] h-9" />;
	}

	return (
		<Input
			ref={inputRef}
			value={searchValue}
			disabled={loading}
			readOnly={loading}
			className="min-w-[350px] max-w-[350px] h-9"
			onChange={handleInputChange}
			placeholder="Search..."
			style={loading ? { cursor: "not-allowed" } : {}}
		/>
	);
};

export default SearchData;
