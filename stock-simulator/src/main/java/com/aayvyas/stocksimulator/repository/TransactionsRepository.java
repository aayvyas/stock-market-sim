package com.aayvyas.stocksimulator.repository;

import com.aayvyas.stocksimulator.models.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface TransactionsRepository extends ReactiveCrudRepository<Transaction, String> {
}