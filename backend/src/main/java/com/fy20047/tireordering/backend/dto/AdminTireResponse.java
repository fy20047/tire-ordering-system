package com.fy20047.tireordering.backend.dto;

import java.time.LocalDateTime;

// 後台輪胎資料 Response DTO
public record AdminTireResponse(
        Long id,
        String brand,
        String series,
        String origin,
        String size,
        Integer price,
        boolean isActive,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
