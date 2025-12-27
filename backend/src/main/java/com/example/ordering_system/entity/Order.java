package com.example.ordering_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders") // 對應資料庫裡的 orders 表
@Data // Lombok: 自動生成 Getter, Setter, toString, etc.
@NoArgsConstructor // Lombok: 無參數建構子 (JPA 需要)
@AllArgsConstructor // Lombok: 全參數建構子
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 基本個資
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "phone", nullable = false, length = 50)
    private String phone;

    // 輪胎資訊
    @Column(name = "tire_brand", nullable = false, length = 100)
    private String tireBrand;

    @Column(name = "tire_series", nullable = false, length = 100)
    private String tireSeries;

    @Column(name = "tire_size", nullable = false, length = 50)
    private String tireSize;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    // 關鍵邏輯：安裝選項 (使用 Enum 增加程式可讀性)
    @Enumerated(EnumType.STRING)
    @Column(name = "installation_option", nullable = false, length = 50)
    private InstallationOption installationOption;

    // 寄送地址 (只有配送時需要，所以沒有設 nullable=false，但在 Service 層會檢查)
    @Column(name = "delivery_address", columnDefinition = "TEXT")
    private String deliveryAddress;

    // 訂單狀態
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 50)
    private OrderStatus status = OrderStatus.PENDING;

    // 時間戳記
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // 自動化處理時間
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = OrderStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }


    // 內部列舉 (Enum) - 定義固定選項

    // 安裝選項：要安裝、純取貨、純配送
    public enum InstallationOption {
        YES_INSTALL,
        NO_PICKUP,
        NO_DELIVERY
    }

    // 訂單狀態
    public enum OrderStatus {
        PENDING,   // 待處理
        CONFIRMED, // 已確認
        COMPLETED, // 已完成
        CANCELLED  // 已取消
    }
}