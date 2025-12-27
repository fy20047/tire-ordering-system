package com.example.ordering_system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data // Lombok，自動幫你產生 getter/setter
@Entity // 告訴 Spring 這是對應資料庫的物件
@Table(name = "visit_counter") // 對應資料庫裡的table visit_counter
public class VisitCounter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_visits")
    private Long totalVisits;

    @Column(name = "today_visits")
    private Long todayVisits;

    @Column(name = "month_visits")
    private Long monthVisits;

    @Column(name = "last_reset_date")
    private LocalDate lastResetDate;

    @Column(name = "last_month_reset_date")
    private LocalDate lastMonthResetDate;

    // updatable = false，因為這是由資料庫自動管理的
    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}