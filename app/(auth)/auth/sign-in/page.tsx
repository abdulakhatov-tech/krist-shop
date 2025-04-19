import { SuspenseLoading } from "@/tools";
import SignInPageView from "@/views/auth/sign-in";

const SignIn = () => {
	return (
		<SuspenseLoading mode="website">
			<SignInPageView />
		</SuspenseLoading>
	);
};

export default SignIn;
