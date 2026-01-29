package com.fy20047.tireordering.backend.dto;

// 登入回傳 token 的 Response DTO (登入 API 的回傳格式)
// 內容包含 token, expiresInSeconds
// 這樣前端收到 token 才能存取後台 API
// expiresIn 也方便前端做登入狀態管理（expiresIn 表示 token 有效時間（秒））
public record AdminLoginResponse(String token, long expiresInSeconds) {
}
