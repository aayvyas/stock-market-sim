package com.aayvyas.stocksimulator;

import com.aayvyas.stocksimulator.models.Transaction;
import com.aayvyas.stocksimulator.service.StockSimulatorService;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;

@SpringBootApplication
@EnableReactiveMongoRepositories
@Slf4j
public class StockSimulatorApplication extends AbstractReactiveMongoConfiguration {

	public static void main(String[] args) {
		SpringApplication.run(StockSimulatorApplication.class, args);

	}
	@KafkaListener(topics = "update", groupId = "default")
	public void getData(ConsumerRecord data) {

		log.info("Stock {} at {}",data.key(), data.value());

	}

	@Bean
	public MongoClient mongoClient() {
		return MongoClients.create();
	}
	@Override
	protected String getDatabaseName() {
		return "reactive";
	}
}
