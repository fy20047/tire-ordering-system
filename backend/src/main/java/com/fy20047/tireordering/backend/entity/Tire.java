package com.fy20047.tireordering.backend.entity;

import jakarta.persistence.*; // 使用 * 讓 import 比較簡潔
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tires")
// Lombok
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
// --------------------
public class Tire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String brand;

    @Column(nullable = false, length = 100)
    private String series;

    @Column(nullable = false, length = 50)
    private String size;

    @Column
    private Integer price;

    @Builder.Default // 因為有預設值 true，所以加上 @Builder.Default
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // 設定時間戳記
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