package com.fy20047.tireordering.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

// JWT 設定讀取（secret、過期時間）
@ConfigurationProperties(prefix = "security.jwt")
public record JwtProperties(String secret, long expirationSeconds) {
}
