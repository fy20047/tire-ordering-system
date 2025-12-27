# Tire Ordering System 

> 更新日期：2025-12-28

## 🚀 目前進度 (Current Status)

成功完成從「前端表單」到「後端資料庫」的完整流程 (End-to-End)，完成了一個最小可行性產品 (MVP) 的核心功能。

### ✅ 已完成功能 (Accomplishments)
1.  **資料庫設計**：建立 `visit_counter` (訪客) 與 `orders` (訂單) 資料表。
2.  **後端架構 (Spring Boot)**：
    - 實作 Entity, Repository, Service, Controller 四層架構。
    - 完成「新增訂單」API (`POST /api/orders`)，包含業務邏輯驗證。
    - 完成「查詢訂單」API (`GET /api/orders`)。
    - 使用 Enum 管理訂單狀態與安裝選項，提升程式碼可讀性。
3.  **前端架構 (React + TypeScript)**：
    - 使用 Vite 快速建置現代化開發環境。
    - 導入 **Chakra UI (v2)** 打造響應式 (RWD) 介面。
    - 實作 `OrderForm` 訂單表單，包含：
        - 欄位連動 (選擇寄送時自動顯示地址欄位)。
        - 前端防呆驗證 (必填檢查、數值限制)。
    - 使用 **Axios** 串接後端 API，實現真實資料傳輸。
4.  **開發流程**：
    - 採用前後端分離 (Client-Server Separation)。
    - 使用 HTTP Client (IntelliJ) 進行 API 測試。

---

## 🛠️ 技術棧 (Tech Stack)

### Frontend (前端)
* **Core**: React 18, TypeScript
* **Build Tool**: Vite
* **UI Framework**: Chakra UI (v2)
* **HTTP Client**: Axios
* **State Management**: React Hooks (useState)

### Backend (後端)
* **Framework**: Spring Boot 4.0.1 (Java 21)
* **Database**: MySQL 8.0
* **ORM**: Spring Data JPA (Hibernate)
* **Tooling**: Lombok, Maven

---

## 📂 專案結構 (Project Structure)

```text
tire-ordering-system/
├── backend/            # Spring Boot 後端專案
│   ├── src/main/java   # Java 原始碼 (Controller, Service, Repository...)
│   └── database_schema.sql # 資料庫初始化腳本
├── frontend/           # React 前端專案
│   ├── src/components  # UI 元件 (OrderForm.tsx)
│   └── src/types.ts    # TypeScript 型別定義
└── README.md           # 專案說明文件