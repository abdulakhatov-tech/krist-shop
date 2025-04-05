import { Loader } from "lucide-react";
import type { FC } from "react";

interface LoadingSpinnerProps {
	className?: string;
	size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const sizeClasses = {
	sm: "w-4 h-4", // 16px
	md: "w-6 h-6", // 24px
	lg: "w-8 h-8", // 32px
	xl: "w-10 h-10", // 40px
	"2xl": "w-12 h-12", // 48px
	"3xl": "w-16 h-16", // 64px
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({
	className,
	size = "md",
}) => {
	return <Loader className={`spin ${sizeClasses[size]} ${className || ""}`} />;
};

export default LoadingSpinner;
