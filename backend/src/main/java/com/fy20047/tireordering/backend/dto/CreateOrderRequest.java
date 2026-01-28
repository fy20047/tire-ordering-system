package com.fy20047.tireordering.backend.dto;

import com.fy20047.tireordering.backend.enums.InstallationOption;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// 顧客填寫訂單
public record CreateOrderRequest(
        @NotNull Long tireId,
        @NotNull @Min(1) Integer quantity,
        @NotBlank @Size(max = 100) String customerName,
        @NotBlank @Size(max = 50) String phone,
        @Email @Size(max = 255) String email,
        @NotNull InstallationOption installationOption,
        @Size(max = 500) String deliveryAddress,
        @NotBlank @Size(max = 100) String carModel,
        @Size(max = 1000) String notes
) {
}
