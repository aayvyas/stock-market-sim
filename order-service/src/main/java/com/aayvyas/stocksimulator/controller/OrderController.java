package com.aayvyas.stocksimulator.controller;

import com.aayvyas.stocksimulator.dto.OrderRequest;
import com.aayvyas.stocksimulator.models.Transaction;
import com.aayvyas.stocksimulator.repository.TransactionsRepository;
import com.aayvyas.stocksimulator.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    String healthCheck() {
        return "Ok";
    }

    @PostMapping("/order")
    Mono<Transaction> createOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    @GetMapping("/orders")
    Flux<Transaction> getOrders() {
        return orderService.getAllTransactions();
    }

    @GetMapping("/orders/page")
    Flux<Transaction> getOrdersPaginated(@RequestParam int start, int limit ) {
        return orderService.getPaginatedTransactions(start, limit);
    }



}
