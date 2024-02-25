"use client";

import { Animation, Animations, ChartData, _adapters } from "chart.js";
import "chartjs-adapter-moment";
import Chart from "chart.js/auto";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Line } from "react-chartjs-2";
import { Socket, io } from "socket.io-client";
import { CategoryScale } from "chart.js";
import { easingEffects } from "chart.js/helpers";
import { max } from "moment";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
Chart.register(CategoryScale);
type StockState = {
  name: string;
  quantity: number;
  price: number;
  timestamp: string;
};

// take a StockId and plots the realtime chart for it
const StockChart = ({ stockId }: { stockId: string }) => {
  const [stockState, setStockState]: [
    StockState,
    Dispatch<SetStateAction<StockState>>
  ] = useState({ name: stockId, quantity: 0, price: 0, timestamp: "" });

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "LTP",
        data: [],
      },
    ],
  });

  useEffect(() => {
    // establish connection
    const socket = io("http://localhost:3000", {
      transports: ["websocket", "polling", "flashsocket"],
    }).connect();

    // Listen for incoming messages
    socket.on("connection", () => {
      console.log("connected");
      socket.emit("join", stockId);
      socket.on("message", (data) => {
        console.log("recevied through message event", data);
        const stock: StockState = data;
        setStockState(() => stock);
        // @ts-ignore
        setData((prev) => {
          return {
            ...prev,
            datasets: [
              {
                label: "LTP",
                data: [
                  ...prev.datasets[0].data,
                  {
                    x: new Date(Date.parse(stock.timestamp)),
                    y: stock.price,
                  },
                ],
              },
            ],
            labels: [...prev.labels, new Date(Date.parse(stock.timestamp))],
          };
        });

        // clear connection
        return () => {
          socket.disconnect();
        };
      });
    });
  }, []);

  return (
    <div className="dark:bg-zinc-950 border border-zinc-900 w-full h-full p-5 rounded-3xl">
      <div className="flex justify-between h-10">
        <h1 className="font-bold"> {stockState.name}</h1>
        <Link
          href={`/${stockId}`}
          className="transition-all duration-700 shadow-2xl  hover:border-zinc-900 hover:cursor-pointer hover:bg-zinc-800 w-fit h-fit p-2 rounded-full justify-center flex items-center"
        >
          <ChevronRight size={20} />
        </Link>
      </div>
      <Line
        updateMode="active"
        options={{
          resizeDelay: 0,
          clip: {
            left: 5,
            top: 0,
            bottom: 0,
            right: 100,
          },
          normalized: true,
          spanGaps: true,
          plugins: {
            title: {
              color: "#000000",
              text: stockState.name,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5,
              },
              type: "timeseries",
            },
          },
        }}
        title={stockState.name}
        data={data}
      ></Line>
    </div>
  );
};

export { StockChart };
