import { CheckoutSuccessModal } from "@/common/modals";
import { RootFooter, RootNavbar } from "@/layouts";
import type { Metadata } from "next";
import type React from "react";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: {
		default: "Krist | Premium Online Shopping Marketplace",
		template: "%s | Krist",
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

const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<RootNavbar />
			<main className="min-h-[60vh]">{children}</main>
			<RootFooter />

			<CheckoutSuccessModal />
		</>
	);
};

export default RootLayout;
