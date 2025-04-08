"use client";

import {
	Facebook,
	Github,
	Linkedin,
	SendHorizontal,
	Twitter,
} from "lucide-react";
import Link from "next/link";
import type React from "react";

import "./style.css";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import useFooterFeatures from "./features";

interface FooterTitleProps {
	title: string;
	className?: string;
}

const FooterTitle: React.FC<FooterTitleProps> = ({ title, className }) => (
	<h4 className={cn("text-2xl font-bold tracking-wider", className ?? "mb-6")}>
		{title}
	</h4>
);

const RootFooter: React.FC = () => {
	const { handleFormSubmit, emailRef, isSubmitting } = useFooterFeatures();

	return (
		<footer className="py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-black text-white">
			<div className="container">
				<div className="wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
					{/* Exclusive */}
					<div>
						<FooterTitle title="Exclusive" />
						<ul className="flex flex-col gap-4">
							<li>Subscribe</li>
							<li>Get 10% off your first order</li>
							<li>
								<form
									onSubmit={handleFormSubmit}
									className="relative min-w-[300px] max-w-[320px]"
								>
									<Input
										placeholder="Enter your email"
										className="w-full h-[40px]"
										ref={emailRef}
										required
										type="email"
									/>
									<button
										type="submit"
										disabled={isSubmitting}
										className="absolute top-0 right-0 h-full px-4 py-2 hover:text-blue-500"
									>
										{isSubmitting ? <LoadingSpinner /> : <SendHorizontal />}
									</button>
								</form>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div>
						<FooterTitle title="Support" />
						<ul className="flex flex-col gap-4">
							<li>Tashkent, Uzbekistan</li>
							<li>
								<Link
									href="mailto:islomabdulakhatov@gmail.com"
									target="_blank"
									className="hover:text-blue-500"
								>
									islomabdulakhatov@gmail.com
								</Link>
							</li>
							<li>
								<Link
									href="tel:+998995289896"
									target="_blank"
									className="hover:text-blue-500"
								>
									+998 99 528 98 96
								</Link>
							</li>
						</ul>
					</div>

					{/* Account */}
					<div>
						<FooterTitle title="Account" />
						<ul className="flex flex-col gap-4">
							<li>
								<Link
									href="/profile"
									target="_blank"
									className="hover:text-blue-500"
								>
									My Account
								</Link>
							</li>
							<li>
								<Link
									href="/auth/sign-in"
									target="_blank"
									className="hover:text-blue-500"
								>
									Login
								</Link>{" "}
								/{" "}
								<Link
									href="/auth/sign-up"
									target="_blank"
									className="hover:text-blue-500"
								>
									Register
								</Link>
							</li>
							<li>
								<Link
									href="/shopping-cart"
									target="_blank"
									className="hover:text-blue-500"
								>
									Shopping Cart
								</Link>
							</li>
							<li>
								<Link
									href="/wishlist"
									target="_blank"
									className="hover:text-blue-500"
								>
									Wishlist
								</Link>
							</li>
							<li>
								<Link
									href="/shop"
									target="_blank"
									className="hover:text-blue-500"
								>
									Shop
								</Link>
							</li>
						</ul>
					</div>

					{/* Quick Links + Social */}
					<div>
						<FooterTitle title="Quick Links" />
						<ul className="flex flex-col gap-4">
							<li>Privacy Policy</li>
							<li>Terms Of Use</li>
							<li>FAQ</li>
							<li>Contact</li>
						</ul>

						<FooterTitle title="Social Media" className="mt-6 mb-4" />
						<ul className="flex gap-4">
							<li>
								<Link
									href="https://www.facebook.com/abdulakhatov.dev/"
									target="_blank"
									className="hover:text-blue-500"
								>
									<Facebook />
								</Link>
							</li>
							<li>
								<Link
									href="https://x.com/AbdulakhatovI"
									target="_blank"
									className="hover:text-blue-500"
								>
									<Twitter />
								</Link>
							</li>
							<li>
								<Link
									href="https://github.com/abdulakhatov-tech"
									target="_blank"
									className="hover:text-blue-500"
								>
									<Github />
								</Link>
							</li>
							<li>
								<Link
									href="https://www.linkedin.com/in/islom-abdulakhatov/"
									target="_blank"
									className="hover:text-blue-500"
								>
									<Linkedin />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default RootFooter;
