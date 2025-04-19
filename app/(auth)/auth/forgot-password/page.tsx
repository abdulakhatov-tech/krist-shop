export const dynamic = "force-dynamic";

("use client");

import { SuspenseLoading } from "@/tools";
import ForgotPasswordPageView from "@/views/auth/forgot-password";

const ForgotPassword = () => {
	return (
		<SuspenseLoading mode="website">
			<ForgotPasswordPageView />
		</SuspenseLoading>
	);
};

export default ForgotPassword;
