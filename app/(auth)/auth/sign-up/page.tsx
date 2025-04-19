"use client";

import { SuspenseLoading } from "@/tools";
import SignUpPageView from "@/views/auth/sign-up";

const SignUpPage = () => {
	return (
		<SuspenseLoading mode="website">
			<SignUpPageView />
		</SuspenseLoading>
	);
};

export default SignUpPage;
