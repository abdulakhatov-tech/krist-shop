import type { ReactNode } from "react";
import AuthProvider from "react-auth-kit";

import { Toaster } from "@/components/ui/sonner";
import { authStore } from "@/config/authStore.config";

const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider store={authStore}>
			{children}
			<Toaster />
		</AuthProvider>
	);
};

export default AppProviders;
