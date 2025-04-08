"use client";

import { useRouter } from "next/navigation";
import type React from "react";
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
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SignOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const isAuthenticated = useAuthHeader();
	const signOut = useSignOut();
	const router = useRouter();

	const handleSignOut = () => {
		if (!isAuthenticated) return;

		signOut();
		router.push("/auth/sign-in");
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger className="w-full">
				{children || "Log out"}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleSignOut}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default SignOut;
