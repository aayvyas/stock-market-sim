import React from "react";
import Card from "./ui/Card";
import { IndianRupee } from "lucide-react";
import { Order, OrderRequest } from "@/lib/orders";

const Transaction = ({ order }: { order: Order }) => {
  return (
    <Card className="m-2 p-5 grid grid-cols-2" key={order.stockId}>
      <div>
        <h1 className="text-2xl font-bold">{order.stockId}</h1>
        <p className="text-sm flex items-center">
          ATP : <IndianRupee size={15} /> {order.price}
        </p>
        <p className="text-md">Quantity : {order.quantity}</p>
        <p className="text-sm text-gray-500">
          {new Date(Date.parse(order.timestamp)).toString().split("GMT")[0]}
        </p>
      </div>
      <div className="mx-2 px-2 flex flex-col justify-center items-center">
        <h3 className="font-semibold text-xl">P&L</h3>
        <p className="p-5 bg-zinc-900 rounded-2xl text-3xl flex justify-center items-center">
          <IndianRupee size={20} />
          {order.quantity * order.price}
        </p>
      </div>
    </Card>
  );
};

export default Transaction;
