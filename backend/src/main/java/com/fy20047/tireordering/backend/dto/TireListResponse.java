package com.fy20047.tireordering.backend.dto;

import java.util.List;

// 包含很多個 TireResponse
// 給前端畫出整個頁面用的
public record TireListResponse(List<TireResponse> items) {
}
