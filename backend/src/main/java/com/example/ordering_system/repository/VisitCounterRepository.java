package com.example.ordering_system.repository;

import com.example.ordering_system.entity.VisitCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// JpaRepository<VisitCounter, Long> 的意思是：
// 這個倉庫是用來管理 VisitCounter 的，而且它的主鍵 (ID) 是 Long 類型
@Repository
public interface VisitCounterRepository extends JpaRepository<VisitCounter, Long> {
    // 這裡先保持空白，Spring Data JPA 會自動寫好 SQL
}