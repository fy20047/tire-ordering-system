package com.example.ordering_system.service;

import com.example.ordering_system.entity.Order;
import com.example.ordering_system.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service // 處理邏輯
public class OrderService {

    // Service 不會自己連資料庫，它一定要透過 Repository
    private final OrderRepository orderRepository;

    // 建構子注入 (Constructor Injection)
    // Spring 會自動把 OrderRepository 拿給 OrderService 使用
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * 功能：建立新訂單
     * 檢查資料是否正確
     */
    @Transactional // 確保資料庫操作要嘛全成功，要嘛全失敗 (交易管理)
    public Order createOrder(Order order) {

        // 如果客戶選的是 "NO_DELIVERY" (純配送)，那地址欄位不能是空的
        if (order.getInstallationOption() == Order.InstallationOption.NO_DELIVERY) {
            if (order.getDeliveryAddress() == null || order.getDeliveryAddress().trim().isEmpty()) {
                // 如果地址是空的，直接丟出錯誤，不存入資料庫
                throw new IllegalArgumentException("錯誤：選擇配送服務時，寄送地址不能為空！");
            }
        }

        // 設定預設值，確保訂單狀態是 PENDING (待處理)
        if (order.getStatus() == null) {
            order.setStatus(Order.OrderStatus.PENDING);
        }

        // 呼叫 Repository 把這張訂單存入資料庫
        return orderRepository.save(order);
    }

    /**
     * 功能：取得所有訂單 (之後給後台管理員看的)
     */
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}