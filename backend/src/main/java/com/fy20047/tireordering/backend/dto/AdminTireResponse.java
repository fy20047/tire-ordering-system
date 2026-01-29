package com.fy20047.tireordering.backend.dto;

import java.time.LocalDateTime;

// 後台輪胎列表回傳
// 統一回傳格式 { items: [...] }，這樣前端才好處理
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
