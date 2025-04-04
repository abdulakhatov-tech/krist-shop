"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setResetPasswordModalVisibility } from "@/redux/slices/modals/resetPasswordSuccessModalSlice";
import type { RootState } from "@/redux/store";

const SuccessModal = () => {
	const router = useRouter();
	const open = useAppSelector(
		(state: RootState) => state.resetPasswordSuccessModalSlice.open,
	);
	const dispatch = useAppDispatch();

	const handleClick = () => {
		router.push("/auth/sign-in");
		dispatch(setResetPasswordModalVisibility(false));
	};

	return (
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<div className="p-3 bg-[#1311180d] w-fit rounded-full mx-auto mb-5 mt-6">
						<div className="p-3 bg-[#1311181A] w-fit rounded-full">
							<div className="w-16 h-16 rounded-full bg-black center">
								<div className="w-6 h-6 rounded-full bg-white center">
									<Check />
								</div>
							</div>
						</div>
					</div>

					<DialogTitle className="text-2xl font-bold leading-[100%] text-center">
						Password Changed Successfully
					</DialogTitle>
					<DialogDescription className="text-md font-normal text-center">
						Your password has been updated successfully
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="mt-[30px]">
					<Button type="submit" className="w-full h-12" onClick={handleClick}>
						Back to Login
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SuccessModal;
