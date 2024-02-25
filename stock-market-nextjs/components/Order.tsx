"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeIndianRupee,
  BadgeMinus,
  Hash,
  IndianRupee,
  IndianRupeeIcon,
  Sigma,
  SigmaSquareIcon,
  X,
} from "lucide-react";
import TextInput from "./ui/TextInput";
import { type Order, createOrder } from "@/lib/orders";
import Modal from "./ui/Modal";
import clsx from "clsx";
import Transaction from "./Transaction";

const Order = ({ stockId }: { stockId: string }) => {
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [result, setResult]: [
    result: boolean | undefined,
    setResult: Dispatch<SetStateAction<boolean | undefined>>
  ] = useState();

  const [order, setOrder]: [
    order: Order | undefined,
    setOrder: Dispatch<SetStateAction<undefined | Order>>
  ] = useState();

  const transaction = async (type: "BUY" | "SELL") => {
    if (
      price === undefined ||
      quantity === undefined ||
      stockId === undefined
    ) {
      return;
    }

    let res = await createOrder({
      price: price ? price : 0,
      quantity: quantity ? quantity : 0,
      stockId: stockId ? stockId : "",
      type: type,
    });

    if (res != undefined) {
      setResult(() => true);
      setOrder(() => res);
    } else {
      setResult(() => false);
    }
  };

  const triggerBuy = async () => {
    await transaction("BUY");
  };

  const triggerSell = async () => {
    await transaction("SELL");
  };

  return (
    <Card className="flex flex-col space-y-5 p-5 items-center">
      <div className="w-full">
        <h1 className="text-3xl font-bold ">{stockId}</h1>
      </div>
      <span className="flex bg-zinc-900 w-fit p-3 rounded-xl text-5xl">
        <IndianRupee /> 234
      </span>
      <div className="w-full justfy-center items-center flex-row flex space-x-4">
        <label className="flex flex-col justify-center w-full m-2">
          <p className="text-sm m-1 items-center flex">
            <Sigma className="m-1" />
            Quantity
          </p>
          <TextInput
            placeholder="Enter Quantity"
            className=""
            onChange={setQuantity}
          ></TextInput>
        </label>
        <label className="flex flex-col justify-center w-full m-2">
          <p className="text-sm m-1 items-center flex">
            <BadgeIndianRupee className="m-1" />
            Price
          </p>
          <TextInput
            placeholder="Enter Price"
            className=""
            onChange={setPrice}
          ></TextInput>
        </label>
      </div>
      <span className="flex flex-row space-x-3 w-1/2 justify-around">
        <Button
          variant="Success"
          className="w-fit flex justify-between"
          onClick={triggerBuy}
        >
          <ArrowDownRight />
          Buy
        </Button>
        <Button
          variant="Danger"
          className="w-fit flex justify-between"
          onClick={triggerSell}
        >
          Sell
          <ArrowUpRight />
        </Button>
      </span>
      <span>
        <p className="text-xs text-blue-300 flex justify-center items-center w-fit p-1">
          <BadgeMinus size={20} className="m-1" />
          charges:
          {price !== undefined && quantity !== undefined ? price / 200 : 0}
        </p>
      </span>
      {result != undefined && (
        <Modal>
          <Card className="transition scale-110 w-1/3 h-1/3 flex flex-col relative justify-center items-center">
            <X
              onClick={() => {
                setResult((res) => undefined);
              }}
              size={30}
              className="hover:bg-zinc-900 bg-zinc-800 hover:cursor-pointer p-2 rounded-full absolute right-7 top-7"
            />
            <h1
              className={clsx("text-3xl m-10 font-semibold", {
                "text-red-500": result === false,
                "": result === true,
              })}
            >
              {result ? "Order Placed" : "Failed placing the Order!"}
            </h1>
            <div className="w-10/12">
              {order && <Transaction order={order} />}
            </div>
          </Card>
        </Modal>
      )}
    </Card>
  );
};

export default Order;
