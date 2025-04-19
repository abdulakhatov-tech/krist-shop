import { SuspenseLoading } from "@/tools";
import ResetPasswordPageView from "@/views/auth/reset-password";

const ResetPassword = () => {
	return (
		<SuspenseLoading mode="website">
			<ResetPasswordPageView />
		</SuspenseLoading>
	);
};

export default ResetPassword;
