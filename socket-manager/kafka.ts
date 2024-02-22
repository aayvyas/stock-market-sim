import { Kafka } from "kafkajs";

export const KafkaClient = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
