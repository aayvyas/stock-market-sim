"use client";
import React from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeIndianRupee,
  Hash,
  IndianRupee,
  IndianRupeeIcon,
  Sigma,
  SigmaSquareIcon,
} from "lucide-react";
import TextInput from "./ui/TextInput";

const Order = () => {
  return (
    <Card className="flex flex-col space-y-5 p-5">
      <h1 className="text-3xl font-bold">ONGC</h1>
      <span className="bg-zinc-900 w-fit p-2 rounded-xl text-5xl">234</span>
      <div className="w-full flex-row flex space-x-4">
        <label className="flex flex-col justify-center">
          <p className="text-sm m-1 items-center flex">
            <Sigma className="m-1" />
            Quantity
          </p>
          <TextInput
            placeholder="Enter Quantity"
            className=""
            onChange={() => {}}
          ></TextInput>
        </label>
        <label className="flex flex-col justify-center">
          <p className="text-sm m-1 items-center flex">
            <BadgeIndianRupee className="m-1" />
            Price
          </p>
          <TextInput
            placeholder="Enter Quantity"
            className=""
            onChange={() => {}}
          ></TextInput>
        </label>
      </div>
      <span className="flex flex-row space-x-3 w-full justify-around">
        <Button variant="Success" className="w-fit flex justify-between">
          <ArrowDownRight />
          Buy
        </Button>
        <Button variant="Danger" className="w-fit flex justify-between">
          Sell
          <ArrowUpRight />
        </Button>
      </span>
    </Card>
  );
};

export default Order;
