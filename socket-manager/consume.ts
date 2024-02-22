import { BroadcastOperator, Server } from "socket.io";
import { KafkaClient } from "./kafka";
import { randomUUID } from "crypto";

type StockResponse =
  | Omit<Stock, "id">
  | {
      name: string;
    };

type Stock = {
  id: string;
  price: number;
  quantity: number;
  timestamp: string;
};

// It will take the room id which will be stock id and will send sepcific updates to that room only
const getUpdates = async (io: Server<any, any>) => {
  const consumer = KafkaClient.consumer({ groupId: randomUUID().toString() });

  await consumer.connect();
  await consumer.subscribe({ topic: "update", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const key = message.key?.toString().replaceAll('"', "");
      if (key === undefined) {
        throw "Error: Key is empty";
      }
      const value: Stock | null = message.value?.toString()
        ? JSON.parse(message.value?.toString())
        : null;
      if (value) {
        io.to(key).emit("message", {
          name: key,
          price: value.price,
          quantity: value.quantity,
          timestamp: value.timestamp,
        } as StockResponse);
      }
    },
  });
};

export { getUpdates };
