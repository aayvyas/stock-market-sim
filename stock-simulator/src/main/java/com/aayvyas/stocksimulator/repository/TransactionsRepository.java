package com.aayvyas.stocksimulator.repository;

import com.aayvyas.stocksimulator.models.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface TransactionsRepository extends ReactiveMongoRepository<Transaction, String> {
}