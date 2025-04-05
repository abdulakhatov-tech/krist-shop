"use client";

import { addDays, format, isValid, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface RangeDatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
	loading?: boolean;
	className?: string;
}

const DATE_FORMAT = "yyyy-MM-dd";
const DISPLAY_FORMAT = "LLL dd, y";

function parseDateParam(dateString: string | null): Date | undefined {
	if (!dateString) return undefined;
	const date = parseISO(dateString);
	return isValid(date) ? date : undefined;
}

function RangeDatePicker({ className, loading = false }: RangeDatePickerProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(params: Record<string, string>) => {
			const newParams = new URLSearchParams(searchParams.toString());

			for (const [key, value] of Object.entries(params)) {
				if (value) {
					newParams.set(key, value);
				}
			}

			return newParams.toString();
		},
		[searchParams],
	);

	const startDate = parseDateParam(searchParams.get("startDate"));
	const endDate = parseDateParam(searchParams.get("endDate"));

	const [date, setDate] = useState<DateRange | undefined>(() => {
		const from = startDate || new Date();
		const to = endDate || addDays(from, 20);
		return { from, to };
	});

	const handleDateChange = (range: DateRange | undefined) => {
		setDate(range);

		const params = {
			startDate: range?.from ? format(range.from, DATE_FORMAT) : "",
			endDate: range?.to ? format(range.to, DATE_FORMAT) : "",
		};

		router.push(`?${createQueryString(params)}`);
	};

	if (loading) {
		return <Skeleton className="w-[280px] h-9" />;
	}

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date-range-picker"
						variant="outline"
						size={"lg"}
						className={cn(
							"w-fit justify-start text-left font-normal h-9",
							!date && "text-muted-foreground",
						)}
						aria-label="Select date range"
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, DISPLAY_FORMAT)} -{" "}
									{format(date.to, DISPLAY_FORMAT)}
								</>
							) : (
								format(date.from, DISPLAY_FORMAT)
							)
						) : (
							<span>Select date range</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={handleDateChange}
						numberOfMonths={2}
						disabled={{ before: new Date(2025, 0, 1) }} // Example: disable past dates
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export default RangeDatePicker;
