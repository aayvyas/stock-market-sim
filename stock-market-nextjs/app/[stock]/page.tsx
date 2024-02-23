import Order from "@/components/Order";
import { StockChart } from "@/components/StockChart";
import Card from "@/components/ui/Card";

const Page = ({ params }: { params: { stock: string } }) => {
  return (
    <div className="grid grid-cols-3 m-5 grid-rows-2 gap-x-5 gap-y-5">
      <span className="col-span-2 row-span-3">
        <StockChart stockId={params.stock} />
      </span>
      <Order />
      <Card className="h-96">
        <h1>Fundamentals</h1>
      </Card>
    </div>
  );
};

export default Page;
