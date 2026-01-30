package com.fy20047.tireordering.backend.repository;

import com.fy20047.tireordering.backend.entity.Order;
import com.fy20047.tireordering.backend.enums.OrderStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // 取得全部訂單（新到舊）
    List<Order> findAllByOrderByCreatedAtDesc();

    // 依狀態篩選
    List<Order> findByStatusOrderByCreatedAtDesc(OrderStatus status);
}
