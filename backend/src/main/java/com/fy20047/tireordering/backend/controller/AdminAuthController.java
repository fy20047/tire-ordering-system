package com.fy20047.tireordering.backend.controller;

import com.fy20047.tireordering.backend.config.JwtProperties;
import com.fy20047.tireordering.backend.dto.AdminLoginRequest;
import com.fy20047.tireordering.backend.dto.AdminLoginResponse;
import com.fy20047.tireordering.backend.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// 寫登入流程（產 token）- 3. /api/admin/login 登入 API
@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

    private final AdminService adminService;
    private final JwtProperties jwtProperties;

    public AdminAuthController(AdminService adminService, JwtProperties jwtProperties) {
        this.adminService = adminService;
        this.jwtProperties = jwtProperties;
    }

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(@Valid @RequestBody AdminLoginRequest request) {
        String token = adminService.login(request.username(), request.password());
        AdminLoginResponse response = new AdminLoginResponse(token, jwtProperties.expirationSeconds());
        return ResponseEntity.ok(response);
    }
}
