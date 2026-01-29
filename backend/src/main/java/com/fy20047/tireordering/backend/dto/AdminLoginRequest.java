package com.fy20047.tireordering.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// 登入 API 的輸入格式
// DTO 可加驗證註解（@NotBlank）
// 不直接用 Entity，避免暴露 DB 結構
// 只包含 username/password，避免多餘欄位
public record AdminLoginRequest(
        @NotBlank @Size(max = 100) String username,
        @NotBlank @Size(max = 100) String password
) {
}
