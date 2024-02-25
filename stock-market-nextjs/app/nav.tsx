"use client";

import clsx from "clsx";
import {
  ArrowRightLeft,
  CandlestickChartIcon,
  ReceiptIndianRupee,
} from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const NavBar = () => {
  const path = usePathname();

  return (
    <nav className="border-zinc-900 shadow-2xl border-2 w-screen bg-zinc-900 hover:bg-opacity-50 transition-all flex flex-row justify-between px-10  py-3 items-center  backdrop-blur-sm bg-opacity-50">
      <Link className="animate-bounce" href="/">
        <h1 className="text-xl font-semibold opacity-100 flex flex-row text-center items-center cursor-pointer ">
          <ReceiptIndianRupee size={40} strokeWidth={1.25} />
          Stock Market
        </h1>
      </Link>
      <div className="flex space-x-5 justify-center items-center">
        <Link
          href="/transactions"
          className={clsx(
            "hover:cursor-pointer flex w-fit items-center justify-center hover:bg-zinc-900 px-3 py-1 rounded-xl transition-all",
            {
              "bg-blue-900 bg-opacity-40": path === "/transactions",
            }
          )}
        >
          <ArrowRightLeft size={30} />
          <p className="text-sm">Transactions</p>
        </Link>
        <div className="bg-zinc-900 border border-zinc-500 w-10 h-10 rounded-full flex justify-center items-center hover:bg-zinc-800 hover:cursor-pointer">
          AV
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
