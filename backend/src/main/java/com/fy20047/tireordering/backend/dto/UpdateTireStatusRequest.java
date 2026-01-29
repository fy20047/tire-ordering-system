package com.fy20047.tireordering.backend.dto;

import jakarta.validation.constraints.NotNull;

// 切換上架/下架 API 的 Request
// 只改 isActive，避免不必要的欄位更新
public record UpdateTireStatusRequest(@NotNull Boolean isActive) {
}
