package com.aayvyas.stocksimulator;

import com.aayvyas.stocksimulator.dto.OrderRequest;
import com.aayvyas.stocksimulator.models.CallType;
import com.aayvyas.stocksimulator.models.Transaction;
import com.aayvyas.stocksimulator.repository.TransactionsRepository;
import com.aayvyas.stocksimulator.service.OrderService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.internal.matchers.Or;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.stubbing.Answer;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;
import scala.Array;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Objects;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static reactor.core.publisher.Mono.when;

@ExtendWith(SpringExtension.class)
class OrderServiceApplicationTests {

	@Mock
	private TransactionsRepository transactionsRepository;

	@InjectMocks
	private OrderService orderService;

	@Test
	public void testCreateOrder_ValidOrderRequest() {
		// Mock OrderRequest
		OrderRequest orderRequest = OrderRequest.builder().stockId("ABC123").price(100.0).quantity(BigInteger.valueOf(10)).build();

		Transaction expectedTransaction = Transaction.builder()
				.id("some_id")
				.timestamp(LocalDateTime.now().toString())
				.price(orderRequest.getPrice())
				.quantity(orderRequest.getQuantity())
				.stockId(orderRequest.getStockId())
				.build();

		// Mock repository save method
		Mockito.when(transactionsRepository.save(any())).thenReturn(Mono.just(expectedTransaction));

		// When
		Mono<Transaction> result = orderService.createOrder(orderRequest);

		// Then
		StepVerifier.create(result).assertNext(t -> {
					t.getStockId().equals(expectedTransaction.getStockId());
				})
				.verifyComplete();

	}

	@Test
	public void testGetOrders() {

		Transaction transaction = Transaction.builder().build();
		Mockito.when(transactionsRepository.findAll()).thenReturn(Flux.fromIterable(
				Arrays.asList(transaction,transaction,transaction,transaction,transaction,transaction)
		));

		// when
		Flux<Transaction> transactionFlux = orderService.getPaginatedTransactions(0, 5);


		// then
		StepVerifier.create(transactionFlux).expectNextCount(5).verifyComplete();
	}

}
