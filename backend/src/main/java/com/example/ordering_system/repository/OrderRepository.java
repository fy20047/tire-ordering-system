package com.example.ordering_system.repository;

import com.example.ordering_system.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // 資料存取層（資料進出口），Repository 只做 (1)查 (2)存 (3)刪 (4)簡單條件組合
public interface OrderRepository extends JpaRepository<Order, Long> { // 專門處理 Order Entity， 型別是 Long 的 Repository

    // 這裡繼承 JpaRepository，所以可以 save(), findById(), findAll(), delete()
    // 不需要自己寫 SQL

    // 如果需要依照電話找訂單，只需加這一行：
    List<Order> findByPhone(String phone); // 用 List 是因為一個電話號碼可能對應多筆訂單
}