import { CandlestickChartIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const NavBar = () => {
  return (
    <nav className=" border-zinc-900 shadow-2xl border-2 w-screen  bg-zinc-900 hover:bg-opacity-50 transition-all flex flex-row justify-between px-10  py-3 items-center  backdrop-blur-sm bg-opacity-50">
      <Link href="/">
        <h1 className="text-xl font-semibold opacity-100 flex flex-row text-center items-center cursor-pointer">
          <CandlestickChartIcon size={30} strokeWidth={1.25} />
          Stock Market
        </h1>
      </Link>
      <div className="bg-zinc-900 border border-zinc-500 w-10 h-10 rounded-full flex justify-center items-center hover:bg-zinc-800 hover:cursor-pointer">
        AV
      </div>
    </nav>
  );
};
export default NavBar;
