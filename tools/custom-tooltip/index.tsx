import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type PropsType = {
	children: React.ReactNode;
	title: string;
};

const CustomTooltip = ({ children, title }: PropsType) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent>
					<p>{title}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default CustomTooltip;
