package com.fy20047.tireordering.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// 後台新增/編輯輪胎的 Request DTO
public record AdminTireRequest(
        @NotBlank @Size(max = 100) String brand,
        @NotBlank @Size(max = 100) String series,
        @Size(max = 50) String origin,
        @NotBlank @Size(max = 50) String size,
        @Min(0) Integer price,
        @NotNull Boolean isActive
) {
}
