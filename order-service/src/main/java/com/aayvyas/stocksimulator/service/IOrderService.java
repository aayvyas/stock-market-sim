package com.aayvyas.stocksimulator.service;

import com.aayvyas.stocksimulator.dto.OrderRequest;
import com.aayvyas.stocksimulator.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IOrderService {
    Mono<Transaction> createOrder (OrderRequest orderRequest);
    Flux<Transaction> getAllTransactions();
    Flux<Transaction> getPaginatedTransactions(int start, int limit);
    Mono<Page<Transaction>> getPaginatedTransactionsPageable(Pageable pageable) ;
}
