package com.fy20047.tireordering.backend.dto;

// 單一顆輪胎的展示資料
// 只包含顯示於前端所需要的資訊：品牌、系列、尺寸、價格
// 給前端畫出單一商品方格用的
public record TireResponse(
        Long id,
        String brand,
        String series,
        String size,
        Integer price,
        boolean isActive
) {
}
