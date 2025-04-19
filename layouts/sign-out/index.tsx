"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SignOut = () => {
	const signOut = useSignOut();
	const router = useRouter();
	const searchParams = useSearchParams();
	const isAuthenticated = useAuthHeader();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	const auth = searchParams.get("auth");

	useEffect(() => {
		if (auth === "sign-out") {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [auth]);

	const handleSignOut = () => {
		if (!isAuthenticated) return;

		signOut();
		router.push("/auth/sign-in");
	};

	const onCancel = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("auth");

		const newSearch = params.toString();
		router.replace(newSearch ? `${pathname}?${newSearch}` : pathname);
	};

	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleSignOut}
						className="bg-[#DB4444] hover:bg-[#DB4444]"
					>
						Logout
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default SignOut;
