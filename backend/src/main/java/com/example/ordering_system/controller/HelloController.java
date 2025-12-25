package com.example.ordering_system.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// @RestController: 告訴 Spring Boot 這是一個「服務生」(負責處理網路請求)
@RestController
public class HelloController {

    // 2. @GetMapping: 當客人訪問網址 "/hello" 時，執行下面這個方法
    @GetMapping("/hello")
    public String sayHello() {
        // 3. 回傳這串文字給瀏覽器
        return " Spring Boot 後端程式啟動！🚀";
    }
}