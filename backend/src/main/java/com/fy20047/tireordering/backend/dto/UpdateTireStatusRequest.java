package com.fy20047.tireordering.backend.dto;

import jakarta.validation.constraints.NotNull;

// 上/下架切換用的 Request DTO
public record UpdateTireStatusRequest(@NotNull Boolean isActive) {
}
