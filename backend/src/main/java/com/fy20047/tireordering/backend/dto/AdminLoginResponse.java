package com.fy20047.tireordering.backend.dto;

// 登入回傳 token 的 Response DTO
public record AdminLoginResponse(String token, long expiresInSeconds) {
}
