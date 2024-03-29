import { StockChart } from "@/components/StockChart";
import Image from "next/image";
import { Suspense } from "react";
import Skeleton from "./fallback";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-10">
      <div className="grid grid-cols-3 gap-x-6 gap-y-4 mt size-full">
        <Suspense fallback={<Skeleton />}>
          <StockChart stockId="ONGC" />
        </Suspense>

        <StockChart stockId="TATAMOTORS" />
        <StockChart stockId="M&M" />
        <StockChart stockId="HDFCBANK" />
        <StockChart stockId="TATASTEEL" />
      </div>
    </main>
  );
}
