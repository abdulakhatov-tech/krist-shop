"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SearchData = ({ loading = false }: { loading?: boolean }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState(
		searchParams.get("search") || "",
	);
	const inputRef = useRef<HTMLInputElement>(null);

	const isValidSearch = (value: string) => /^[a-zA-Z0-9 ]*$/.test(value);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if (isValidSearch(value)) {
			setSearchValue(value);

			const params = new URLSearchParams(searchParams.toString());

			if (value.trim()) {
				params.set("search", value);
			} else {
				params.delete("search");
			}

			router.replace(`?${params.toString()}`);
		} else {
			toast.error(
				"Invalid input! Only letters, numbers, and spaces are allowed.",
			);
		}
	};

	useEffect(() => {
		setSearchValue(searchParams.get("search") || "");
	}, [searchParams]);

	useEffect(() => {
		if (searchValue.trim() !== "" && inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 10);
		}
	}, [searchValue]);

	useEffect(() => {
		if (inputRef.current) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 10);
		}
	}, []);

	// if (loading) {
	//   return <Skeleton className="w-[350px] h-9" />;
	// }

	return (
		<Input
			ref={inputRef}
			value={searchValue}
			readOnly={loading}
			className="min-w-[350px] max-w-[350px] h-9"
			onChange={handleInputChange}
			placeholder="Search..."
			style={loading ? { cursor: "not-allowed" } : { height: "36px" }}
		/>
	);
};

export default SearchData;
