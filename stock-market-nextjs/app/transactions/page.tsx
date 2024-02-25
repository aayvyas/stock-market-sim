import Transaction from "@/components/Transaction";
import Card from "@/components/ui/Card";
import { Order, fetchOrders } from "@/lib/orders";
import { IndianRupee, IndianRupeeIcon, TvIcon } from "lucide-react";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: `Stock Market - Transactions`,
  description: "View the recent transactions",
};
const OrderList = async () => {
  const orders: Array<Order> | undefined = await fetchOrders(20, 20);

  return (
    <>
      {orders?.map((order: Order, idx: number) => {
        return <Transaction order={order} />;
      })}
    </>
  );
};

const Page = async () => {
  return (
    <div className="w-full m-2 flex flex-col justify-center items-center">
      <h1 className="text-4xl">Recent Transactions </h1>
      <div className="grid grid-cols-2">
        <OrderList />
      </div>
    </div>
  );
};

export default Page;
