package com.fy20047.tireordering.backend.config;

import com.fy20047.tireordering.backend.entity.Admin;
import com.fy20047.tireordering.backend.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// 後端啟動時自動建立初始管理員（用環境變數）
@Component
public class AdminSeedRunner implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeedRunner(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String username = System.getenv("ADMIN_USERNAME");
        String password = System.getenv("ADMIN_PASSWORD");

        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return;
        }

        adminRepository.findByUsername(username).ifPresentOrElse(
                admin -> {
                    // already exists
                },
                () -> {
                    Admin admin = Admin.builder()
                            .username(username.trim())
                            .passwordHash(passwordEncoder.encode(password))
                            .build();
                    adminRepository.save(admin);
                }
        );
    }
}
