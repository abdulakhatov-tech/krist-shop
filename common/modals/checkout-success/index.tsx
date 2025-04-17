"use client";

import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

const CheckoutSuccessModal = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const isSuccess = searchParams.get("checkout") === "success";
		setOpen(isSuccess);
	}, [searchParams]);

	const handleClose = () => {
		// Remove the `checkout` param from the URL
		const params = new URLSearchParams(searchParams.toString());
		params.delete("checkout");
		router.replace(`?${params.toString()}`, { scroll: false });
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="text-center">
				<DialogHeader>
					<DialogTitle className="text-green-600 text-2xl">
						Payment Successful
					</DialogTitle>
					<DialogDescription>
						Thank you for your order! Your payment was processed successfully.
						We’ll notify you once your order is on its way.
					</DialogDescription>
				</DialogHeader>

				<CheckCircle className="mx-auto h-16 w-16 text-green-500 mt-4" />

				{/* Optional: Add a button to manually close or go to orders page */}
				<Button
					onClick={() => {
						handleClose();
						router.push("/orders");
					}}
					className="mt-4"
				>
					View Orders
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default CheckoutSuccessModal;
