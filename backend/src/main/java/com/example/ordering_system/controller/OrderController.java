package com.example.ordering_system.controller;

import com.example.ordering_system.entity.Order;
import com.example.ordering_system.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173") // 允許前端 (React) 呼叫
public class OrderController {

    private final OrderService orderService;

    // 建構子注入 Service
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * API 1: 建立新訂單
     * HTTP Method: POST
     * URL: http://localhost:8080/api/orders
     */
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            // 呼叫 Service 建立訂單
            Order newOrder = orderService.createOrder(order);
            // 成功：回傳 HTTP 200 和建立好的訂單資料
            return ResponseEntity.ok(newOrder);

        } catch (IllegalArgumentException e) {
            // 失敗（例如：選配送卻沒填地址）：回傳 HTTP 400 (Bad Request) 和錯誤訊息
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // 其他預期外的錯誤：回傳 HTTP 500
            return ResponseEntity.internalServerError().body("系統發生錯誤: " + e.getMessage());
        }
    }

    /**
     * API 2: 取得所有訂單 (給後台看)
     * HTTP Method: GET
     * URL: http://localhost:8080/api/orders
     */
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}