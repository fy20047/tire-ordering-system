package com.fy20047.tireordering.backend.dto;

import java.util.List;

// 後台輪胎列表 Response DTO
public record AdminTireListResponse(List<AdminTireResponse> items) {
}
