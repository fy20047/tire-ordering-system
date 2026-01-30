package com.fy20047.tireordering.backend.dto;

import com.fy20047.tireordering.backend.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;

// 訂單狀態更新 Request，可用 Bean Validation 做欄位驗證
public record UpdateOrderStatusRequest(
        @NotNull OrderStatus status
) {
}
