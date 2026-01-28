package com.fy20047.tireordering.backend.dto;

import java.util.Map;

// 回傳給前端的標準錯誤格式
public record ErrorResponse(
        String message,
        Map<String, String> details // 用來裝詳細錯誤 (欄位名 -> 錯誤原因)，可以為 null
) {
}
