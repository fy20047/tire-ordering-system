package com.fy20047.tireordering.backend.repository;

import com.fy20047.tireordering.backend.entity.Admin;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

// 查管理員帳號
// findByUsername 能快速查帳號是否存在
// 不在 Repository 放商業邏輯
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}
