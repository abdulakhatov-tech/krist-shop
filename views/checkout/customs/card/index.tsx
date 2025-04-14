"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";

interface PropsI {
	title: string;
	children: React.ReactNode;
	className?: string;
}

const WrapperCard: React.FC<PropsI> = ({ title, children, className }) => {
	return (
		<Card className="gap-1">
			<CardHeader>
				<CardTitle className="text-xl font-bold">{title}</CardTitle>
			</CardHeader>
			<CardContent className={className}>{children}</CardContent>
		</Card>
	);
};

export default WrapperCard;
