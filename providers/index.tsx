"use client";

import type { ReactNode } from "react";
import AuthProvider from "react-auth-kit";

import { Toaster } from "@/components/ui/sonner";
import { authStore } from "@/config/authStore.config";
import StoreProvider from "./StoreProvider";

const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider store={authStore}>
			<StoreProvider>{children}</StoreProvider>
			<Toaster />
		</AuthProvider>
	);
};

export default AppProviders;
