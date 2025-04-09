import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
	return (
		<section>
			<div className="container">
				<div className="w-full h-screen center flex-col">
					<h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-bold text-center">
						404 Not Found
					</h1>
					<p className="mt-2 mb-6 md:mb-10 text-center">
						You visited page not found. You may go home page.
					</p>
					<Link href="/">
						<Button
							variant={"destructive"}
							className="py-5 md:py-6 px-6 md:px-10 text-lg"
						>
							Back to home page
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
