package com.aayvyas.stocksimulator.service;


import com.aayvyas.stocksimulator.models.Stock;
import com.aayvyas.stocksimulator.models.Transaction;
import com.aayvyas.stocksimulator.repository.TransactionsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class StockSimulatorService {

    private final KafkaTemplate<String, Transaction> kafkaTemplate;

    private final TransactionsRepository transactionsRepository;

    List<Stock> stocks = new ArrayList<>();

    List<Transaction> transactions = new ArrayList<>();

    /**
     * Infinitely make random changes to the stocks in memory to simulate buying and selling of stocks
     * */
    public void sim() throws InterruptedException {
        while (true) {
            log.info("Sending Message to kafka");
            TopicBuilder.name("update").build();
            kafkaTemplate.setDefaultTopic("update");
            Thread.sleep((long) (Math.random() * 500));
            Stock stock = stocks.get((int) Math.floor(Math.random() * 10 % 5));
            log.info(stock.toString());
            Double price = Math.floor(Math.random() * 10) >= 5 ? stock.getLTP() + Math.random()  * 10 : stock.getLTP() - Math.random()  * 10;
            stock.setLTP(price);
            kafkaTemplate.send("update", stock.getName() ,Transaction.builder()
                    .id(String.valueOf(UUID.randomUUID()))
                    .price(price)
                            .timestamp(LocalDateTime.now().toString())
                    .quantity(BigInteger.valueOf((long) (Math.random() * Math.random() * 100)))
                    .build());
        }
    }


    public void addStocks() {

        stocks.add(Stock.builder().name("TATASTEEL").id(String.valueOf(UUID.randomUUID())).LTP(Double.valueOf(142)).build());
        stocks.add(Stock.builder().name("M&M").id(String.valueOf(UUID.randomUUID())).LTP(Double.valueOf(1800)).build());
        stocks.add(Stock.builder().name("ONGC").id(String.valueOf(UUID.randomUUID())).LTP(Double.valueOf(275)).build());
        stocks.add(Stock.builder().name("HDFCBANK").id(String.valueOf(UUID.randomUUID())).LTP(Double.valueOf(1440)).build());
        stocks.add(Stock.builder().name("TATAMOTORS").id(String.valueOf(UUID.randomUUID())).LTP(Double.valueOf(938)).build());
        stocks.add(Stock.builder().name("IRCTC").id(String.valueOf(UUID.randomUUID())).LTP(Double.valueOf(945)).build());
    }

    Flux<Transaction> bulkInsertToDb(){
        // read transactions from Kafka and insert into db
        return Flux.fromIterable(transactions);
    }



}





