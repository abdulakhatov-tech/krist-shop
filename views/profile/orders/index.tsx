"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserOrders } from "@/hooks/useQueryActions/useOrders";
import type { IOrder } from "@/interfaces/order.interface";
import type { IUser } from "@/interfaces/user.interface";
import { cn } from "@/lib/utils";
import { formatCompactDate } from "@/utils/helper-fns/format-date";
import { formatPrice } from "@/utils/helper-fns/format-price";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const UserOrdersPageView = () => {
	const user = useAuthUser() as IUser;
	const { data, isLoading } = useGetUserOrders(user?.id);

	const statusStyles = (order: IOrder) =>
		cn("px-4 py-1 rounded", {
			"bg-[#CFFADB] text-[#05B001]": order.status === "pending",
			"bg-[#C8DEF2] text-[#107FE4]": order.status === "processing",
			"bg-[#E0D8F8] text-[#875DFF]": order.status === "delivered",
			"bg-[#FFC0C0] text-[#FF0000]": order.status === "canceled",
		});

	if (isLoading) {
		return (
			<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				{Array.from({ length: 12 }).map(() => (
					<Skeleton key={crypto.randomUUID()} className="w-full h-30" />
				))}
			</div>
		);
	}

	return (
		<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
			{data?.map((order, index) => (
				<Card key={order.id} className="bg-accent px-0">
					<CardHeader className="flex items-center justify-between gap-4">
						<CardTitle className="text-[18px] font-semibold leading-[21.78px] text-secondary-black">
							Order № {index + 1}
						</CardTitle>
						<time className="text-[16px] font-medium leading-[19.36px] text-secondary-black">
							{formatCompactDate(order?.createdAt)}
						</time>
					</CardHeader>

					<CardFooter className="mt-4 flex items-center justify-between gap-4">
						<Button className={statusStyles(order)}>{order.status}</Button>
						<strong>{formatPrice(order.price)}</strong>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default UserOrdersPageView;
