package com.aayvyas.stocksimulator.controller;

import com.aayvyas.stocksimulator.models.Stock;
import com.aayvyas.stocksimulator.service.StockSimulatorService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Slf4j
public class StockSimulatorController {

    @Autowired
    StockSimulatorService stockSimulatorService;


    @PostMapping("/start")
    @ResponseStatus(HttpStatus.ACCEPTED)
    void startSimulation(@RequestParam String message){

        try {
            log.info( "Message Received {} " ,message);
            stockSimulatorService.sim(message);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }


    @PostMapping("/add")
    @ResponseStatus(HttpStatus.ACCEPTED)
    void add(){
        stockSimulatorService.addStocks();
    }








}
