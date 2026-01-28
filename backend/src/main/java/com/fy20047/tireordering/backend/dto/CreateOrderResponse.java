package com.fy20047.tireordering.backend.dto;

import com.fy20047.tireordering.backend.enums.OrderStatus;

// 訂購成功時顯示訂單編號
public record CreateOrderResponse(
        Long orderId,
        OrderStatus status,
        String message
) {
}
