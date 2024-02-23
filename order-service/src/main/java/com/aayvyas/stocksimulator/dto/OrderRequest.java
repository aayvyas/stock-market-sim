package com.aayvyas.stocksimulator.dto;

import com.aayvyas.stocksimulator.models.CallType;
import lombok.*;

import java.math.BigInteger;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {

    String stockId;

    Double price;

    BigInteger quantity;

    CallType type;

    String timestamp;

}
