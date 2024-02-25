import Order from "@/components/Order";
import { StockChart } from "@/components/StockChart";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Stock Market`,
  description: "Stock Market Simulator Dashboard",
};
const Page = ({ params }: { params: { stock: string } }) => {
  metadata.title = params.stock;
  return (
    <div>
      <div className="grid grid-cols-3 m-5 grid-rows-2 gap-x-5 gap-y-5">
        <span className="col-span-2 row-span-3">
          <StockChart stockId={params.stock} />
        </span>
        <Order stockId={params.stock} />
      </div>
    </div>
  );
};

export default Page;
