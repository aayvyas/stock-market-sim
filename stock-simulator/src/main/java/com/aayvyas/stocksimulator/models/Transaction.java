package com.aayvyas.stocksimulator.models;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Transaction {

    @Id
    String id;

    Double price;

    BigInteger quantity;

    String timestamp;


}
