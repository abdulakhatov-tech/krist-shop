"use client";

import { CheckCheck, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";

import "./style.css";

const Copier: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		if (children) {
			try {
				await navigator.clipboard.writeText(children?.toString() || "");
				setCopied(true);
				setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
			} catch (error) {
				console.error("Copy failed:", error);
			}
		}
	};

	return (
		<span
			className="copier-wrapper relative w-fit pr-5"
			onClick={handleCopy}
			onKeyUp={handleCopy}
		>
			{!copied ? (
				<Copy className="copier-icon absolute w-4 h-4 right-0 -top-2 cursor-pointer" />
			) : (
				<CheckCheck className="copier-icon absolute w-4 h-4 right-0 -top-2 text-green-400" />
			)}
			<span className="select-all">{children}</span>
		</span>
	);
};

export default Copier;
