"use client";

import { SuspenseLoading } from "@/tools";
import VerifyOtpPageView from "@/views/auth/verify-otp";

const VerifyOtp = () => {
	return (
		<SuspenseLoading mode="website">
			<VerifyOtpPageView />
		</SuspenseLoading>
	);
};

export default VerifyOtp;
