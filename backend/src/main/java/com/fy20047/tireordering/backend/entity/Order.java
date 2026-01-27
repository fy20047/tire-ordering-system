package com.fy20047.tireordering.backend.entity;

import com.fy20047.tireordering.backend.enums.InstallationOption;
import com.fy20047.tireordering.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tire_orders")
// Lombok
@Getter
@Setter
@Builder
@NoArgsConstructor  // 生成無參數建構子 (JPA 必要)
@AllArgsConstructor // Builder 必要 (Builder 需要全參數建構子才能運作)
// --------------------
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "tire_id", nullable = false)
    private Tire tire;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "customer_name", nullable = false, length = 100)
    private String customerName;

    @Column(nullable = false, length = 50)
    private String phone;

    @Column(length = 255)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "installation_option", nullable = false, length = 20)
    private InstallationOption installationOption;

    @Column(name = "delivery_address", columnDefinition = "TEXT")
    private String deliveryAddress;

    @Builder.Default // 告訴 Builder 如果沒設定這個值，用預設值 PENDING
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderStatus status = OrderStatus.PENDING;

    @Column(name = "car_model", length = 100)
    private String carModel;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}