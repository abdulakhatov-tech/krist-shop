import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProviders from "@/providers";
import "react-photo-view/dist/react-photo-view.css";
import { SuspenseLoading } from "@/tools";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Krist | Premium Online Shopping Marketplace",
		template: "%s | Krist", // Dynamic title for child pages
	},
	description:
		"Discover amazing deals on fashion, electronics, home goods and more at Krist - Your trusted online shopping destination. Free shipping on orders over $50.",
	keywords: [
		"online shopping",
		"ecommerce",
		"fashion",
		"electronics",
		"home decor",
		"beauty products",
		"best deals",
		"discount shopping",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AppProviders>
					<SuspenseLoading mode="website">{children}</SuspenseLoading>
				</AppProviders>
			</body>
		</html>
	);
}
