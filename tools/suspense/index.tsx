import type React from "react";
import { Suspense } from "react";
import LoadingSpinner from "../spinner";

const SuspenseLoading: React.FC<{
	children: React.ReactNode;
	mode: "dashboard" | "website";
}> = ({ children, mode = "dashboard" }) => {
	return (
		<Suspense
			fallback={
				<div
					className="absolute z-10 w-full bg-accent shadow-2xl"
					style={{
						height:
							mode === "dashboard" ? "calc(100vh - 48px - 40px)" : "100vh",
						width:
							mode === "dashboard" ? "calc(100vw - 255px - 40px)" : "100vw",
					}}
				>
					<LoadingSpinner
						size="lg"
						className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
					/>
				</div>
			}
		>
			{children}
		</Suspense>
	);
};

export default SuspenseLoading;
