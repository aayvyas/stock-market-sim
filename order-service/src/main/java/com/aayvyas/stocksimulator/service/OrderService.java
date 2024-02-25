package com.aayvyas.stocksimulator.service;

import com.aayvyas.stocksimulator.dto.OrderRequest;
import com.aayvyas.stocksimulator.models.Transaction;
import com.aayvyas.stocksimulator.repository.TransactionsRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.UUID;

@Transactional
@RequiredArgsConstructor
@AllArgsConstructor
@Service
public class OrderService implements IOrderService {


    @Autowired
    TransactionsRepository transactionsRepository;

    /**
     * creates an order and persists it to the database
     * @param orderRequest {@link OrderRequest}
     * @return A transaction {@link Mono<Transaction>}
    * */
    public Mono<Transaction> createOrder(OrderRequest orderRequest) {
        return Mono.just(orderRequest).flatMap(o ->
                        Mono.just(Transaction.builder()
                                .id(String.valueOf(UUID.randomUUID()))
                                .timestamp(LocalDateTime.now().toString())
                                .price(o.getPrice())
                                .quantity(o.getQuantity())
                                .stockId(o.getStockId())
                                .build()))
                .flatMap( t -> transactionsRepository.save(t));
    }

    /**
     * @return {@link Flux<Transaction>} of {@link Transaction}
     * */
    public Flux<Transaction> getAllTransactions() {
        return transactionsRepository.findAll();
    }

    /**
     * returns paginated result for the list of transactions
     *
     * @param start from where to start the results
     * @param limit amount of entries to be returned
     *
     * @return {@link Flux<Transaction>} Flux of transactions
     *
     * */
    public Flux<Transaction> getPaginatedTransactions(int start, int limit) {
        return transactionsRepository
                .findAll()
                .skip(start)
                .take(limit);
    }


    public Mono<Page<Transaction>> getPaginatedTransactionsPageable(Pageable pageable) {
        return transactionsRepository.findAllBy(pageable).collectList().zipWith(this.transactionsRepository.count())
                .map(p -> new PageImpl<>(p.getT1(), pageable,p.getT2()));
    }

}
