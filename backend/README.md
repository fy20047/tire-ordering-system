# Tire Ordering System 

> 更新日期: 2025-12-27

今天處理後端邏輯

## 🛠 技術棧 
* 程式語言: Java 21
* 後端框架: Spring Boot 4.0.1 (Spring Web, Spring Data JPA)
* 資料庫: MySQL 8.0
* 建置工具: Maven
* 版本控制: Git

## ✅ 已完成的進度

### 1. 基礎設定
* 完成 Spring Boot 專案初始化與 Maven 依賴設定。
* 建立 MySQL 資料庫與基礎資料表 (`visit_counter`, `orders`)。
* 設定資安防護：使用 `.gitignore` 隔離資料庫真實密碼。

### 2. 訪客計數系統 (Visit Counter)
* 後端 API: 完成 `POST /api/visits` 接口。
* 邏輯: 實作「跨日/跨月自動歸零」的計數算法。
* 驗證: 使用 curl 測試，確認資料庫連線與寫入正常。

### 3. 訂單系統 (Order System) - 待實作 
* 資料結構: 完成訂單實體 (`Order Entity`) 設計，包含顧客資訊、輪胎規格與安裝選項。
* 資料存取: 建立訂單倉庫 (`OrderRepository`)，支援依電話查詢訂單。

## 🚀 啟動專案
1.  將 `backend/src/main/resources/application.properties.example` 複製一份並改名為 `application.properties`。
2.  在該檔案內填入 MySQL 密碼。
3.  在終端機執行：`./mvnw spring-boot:run`。