package com.fy20047.tireordering.backend.dto;

import com.fy20047.tireordering.backend.enums.InstallationOption;
import com.fy20047.tireordering.backend.enums.OrderStatus;
import java.time.LocalDateTime;

// 回傳單筆後台訂單列表，包訂單欄位 + 輪胎資訊（輪胎 id、品牌、系列、尺寸、價格、產地），前端就不用再多打 API 查輪胎
public record AdminOrderResponse(
        Long id,
        OrderStatus status,
        Integer quantity,
        String customerName,
        String phone,
        String email,
        InstallationOption installationOption,
        String deliveryAddress,
        String carModel,
        String notes,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Long tireId,
        String tireBrand,
        String tireSeries,
        String tireOrigin,
        String tireSize,
        Integer tirePrice
) {
}
