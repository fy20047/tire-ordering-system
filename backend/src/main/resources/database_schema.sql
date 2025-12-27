CREATE DATABASE IF NOT EXISTS ordering_system;

USE ordering_system;

-- 訪客計數表
CREATE TABLE IF NOT EXISTS visit_counter (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    total_visits BIGINT DEFAULT 0 COMMENT '總訪客數',
    today_visits BIGINT DEFAULT 0 COMMENT '今日訪客數',
    month_visits BIGINT DEFAULT 0 COMMENT '本月訪客數',
    last_reset_date DATE COMMENT '上次每日重置日期',
    last_month_reset_date DATE COMMENT '上次每月重置日期',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 初始化計數器(如果表是空的才插入)
INSERT INTO visit_counter (total_visits, today_visits, month_visits, last_reset_date, last_month_reset_date)
SELECT 0, 0, 0, CURDATE(), CURDATE()
WHERE NOT EXISTS (SELECT * FROM visit_counter);

-- 訂單表
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL COMMENT '姓名',
    phone VARCHAR(50) NOT NULL COMMENT '電話',
    tire_brand VARCHAR(100) NOT NULL COMMENT '輪胎品牌',
    tire_series VARCHAR(100) NOT NULL COMMENT '輪胎系列',
    tire_size VARCHAR(50) NOT NULL COMMENT '輪胎規格',
    quantity INT NOT NULL COMMENT '訂購數量',

    -- 是否到店安裝 (存字串 YES_INSTALL, NO_PICKUP...)
    installation_option VARCHAR(50) NOT NULL COMMENT '安裝選項',

    -- 選擇配送時才需要地址
    delivery_address TEXT COMMENT '寄送地址',

    -- 訂單狀態 (PENDING, CONFIRMED...)
    status VARCHAR(50) DEFAULT 'PENDING' COMMENT '訂單狀態',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;