package com.aayvyas.stocksimulator.controller;

import com.aayvyas.stocksimulator.dto.OrderRequest;
import com.aayvyas.stocksimulator.models.Transaction;
import com.aayvyas.stocksimulator.repository.TransactionsRepository;
import com.aayvyas.stocksimulator.service.IOrderService;
import com.aayvyas.stocksimulator.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@CrossOrigin("*")
public class OrderController {

    @Autowired
    IOrderService orderService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    String healthCheck() {
        return "Ok";
    }

    @PostMapping("/order")
    @ResponseStatus(HttpStatus.CREATED)
    Mono<Transaction> createOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    @GetMapping("/orders")
    @ResponseStatus(HttpStatus.OK)
    Flux<Transaction> getOrders() {
        return orderService.getAllTransactions();
    }

    @GetMapping("/orders/page")
    @ResponseStatus(HttpStatus.OK)
    Flux<Transaction> getOrdersPaginated(@RequestParam int start, int limit ) {
        return orderService.getPaginatedTransactions(start, limit);
    }

    @GetMapping("/page")
    @ResponseStatus(HttpStatus.OK)
    Mono<Page<Transaction>> getOrdersPaginatedV2(@RequestParam int start, int limit){

        return orderService.getPaginatedTransactionsPageable(PageRequest.of(start,limit));
    }

}
