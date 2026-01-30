package com.fy20047.tireordering.backend.dto;

import java.util.List;

// 後台訂單列表的統一回傳格式，讓前端處理資料結構一致、易擴充。
public record AdminOrderListResponse(List<AdminOrderResponse> items) {
}
