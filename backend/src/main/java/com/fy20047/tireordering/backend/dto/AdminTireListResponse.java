package com.fy20047.tireordering.backend.dto;

import java.util.List;

// 後台輪胎資料回傳
// 後台需要顯示更多欄位（含 createdAt / updatedAt）
public record AdminTireListResponse(List<AdminTireResponse> items) {
}
