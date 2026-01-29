package com.fy20047.tireordering.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// 後台新增/編輯輪胎的 Request DTO
// 清楚定義後台能改的欄位
// 加上 @NotBlank/@Min 等驗證
// @NotBlank / @NotNull 者必填
// price 可以為 null → 表示「價格另洽」
public record AdminTireRequest(
        @NotBlank @Size(max = 100) String brand,
        @NotBlank @Size(max = 100) String series,
        @Size(max = 50) String origin,
        @NotBlank @Size(max = 50) String size,
        @Min(0) Integer price,
        @NotNull Boolean isActive
) {
}
