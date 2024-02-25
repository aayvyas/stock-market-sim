package com.aayvyas.stocksimulator.repository;

import com.aayvyas.stocksimulator.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.data.repository.reactive.ReactiveSortingRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface TransactionsRepository extends ReactiveCrudRepository<Transaction, String>, ReactiveSortingRepository<Transaction, String> {
    Flux<Transaction> findAllBy(Pageable pageable);
}