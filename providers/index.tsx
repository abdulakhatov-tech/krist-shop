"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import AuthProvider from "react-auth-kit";

import { Toaster } from "@/components/ui/sonner";
import { authStore } from "@/config/authStore.config";
import StoreProvider from "./StoreProvider";

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider store={authStore}>
			<QueryClientProvider client={queryClient}>
				<StoreProvider>
					{children}

					<Toaster />
					<ReactQueryDevtools initialIsOpen={false} />
				</StoreProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default AppProviders;
