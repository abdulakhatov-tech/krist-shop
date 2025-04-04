"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import useVerifyOtpPageViewFeatures from "./features";

const VerifyOtpPageView = () => {
	const { form, hasErrors, handleFormSubmit, otpData, timeLeft, formatTime } =
		useVerifyOtpPageViewFeatures();
	const { isSubmitting } = form.formState;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					control={form.control}
					name="otpCode"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								OTP Code:{" "}
								<strong
									onClick={() => {
										if (otpData?.otpCode) {
											navigator.clipboard.writeText(otpData.otpCode);
										}
									}}
									onKeyDown={(e) => {
										if (
											(e.key === "Enter" || e.key === " ") &&
											otpData?.otpCode
										) {
											navigator.clipboard.writeText(otpData.otpCode);
										}
									}}
									className="cursor-pointer text-blue-500 hover:underline text-md"
								>
									{otpData?.otpCode || "N/A"}
								</strong>{" "}
								{timeLeft > 0 ? (
									<>
										expires in <strong>{formatTime(timeLeft)}</strong>
									</>
								) : (
									<span className="text-red-500"> OTP Expired</span>
								)}
							</FormLabel>
							<FormControl>
								<InputOTP maxLength={6} {...field}>
									<InputOTPGroup className="w-full">
										<InputOTPSlot index={0} className="w-full h-12 md:h-14" />
										<InputOTPSlot index={1} className="w-full h-12 md:h-14" />
										<InputOTPSlot index={2} className="w-full h-12 md:h-14" />
										<InputOTPSlot index={3} className="w-full h-12 md:h-14" />
										<InputOTPSlot index={4} className="w-full h-12 md:h-14" />
										<InputOTPSlot index={5} className="w-full h-12 md:h-14" />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormDescription>
								Please enter the one-time password sent to your phone.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Button */}
				<Button
					type="submit"
					disabled={isSubmitting}
					className={cn(hasErrors && "button-error", "mt-4")}
				>
					{isSubmitting ? <LoadingSpinner /> : ""}{" "}
					{isSubmitting ? "Verifying OTP..." : "Verify OTP"}
				</Button>
			</form>
		</Form>
	);
};

export default VerifyOtpPageView;
