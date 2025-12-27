package com.example.ordering_system.controller;

import com.example.ordering_system.entity.VisitCounter;
import com.example.ordering_system.service.VisitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // 告訴 Spring：這是專門處理 Web 請求的「櫃台」
@RequestMapping("/api/visits") // 設定網址路徑：所有的請求都要送到 /api/visits 這裡
@CrossOrigin(origins = "http://localhost:5173") // 這是為了之後給前端 (React) 開後門，允許它呼叫
public class VisitController {

    private final VisitService visitService;

    // Spring 把 Service 注入進來
    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    /**
     * 功能 1: 增加訪客數 (當有人打開網頁時呼叫)
     * HTTP 方法: POST
     * 網址: http://localhost:8080/api/visits
     */
    @PostMapping
    public ResponseEntity<VisitCounter> addVisit() {
        // 呼叫 Service 處理邏輯
        VisitCounter updatedCounter = visitService.addVisit();
        // 把處理好的結果包裝成 HTTP 200 OK 回傳給瀏覽器
        return ResponseEntity.ok(updatedCounter);
    }

    /**
     * 功能 2: 查看目前計數 (不增加數字)
     * HTTP 方法: GET
     * 網址: http://localhost:8080/api/visits
     */
    @GetMapping
    public ResponseEntity<VisitCounter> getVisits() {
        return ResponseEntity.ok(visitService.getStatus());
    }
}
