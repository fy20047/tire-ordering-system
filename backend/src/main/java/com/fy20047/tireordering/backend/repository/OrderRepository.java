package com.fy20047.tireordering.backend.repository;

import com.fy20047.tireordering.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
