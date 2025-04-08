import React from "react";

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "../logo";
import NavItems from "../nav-items";

const NavItemsMobileMode = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu className="block md:hidden active:scale-[0.97]" />
			</SheetTrigger>
			<SheetContent side="left" className="min-w-[280px]">
				<SheetHeader>
					<SheetTitle>
						<Logo />
					</SheetTitle>
					<div className="h-[70vh] flex items-center justify-center">
						<NavItems direction="vertical" />
					</div>
				</SheetHeader>
				<SheetFooter>@copyright {new Date().getFullYear()}</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default NavItemsMobileMode;
