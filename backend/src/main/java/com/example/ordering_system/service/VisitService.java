package com.example.ordering_system.service;

// 處理日期的工具
import java.time.LocalDate;

// 對應資料庫的實體與倉庫
import com.example.ordering_system.entity.VisitCounter;
import com.example.ordering_system.repository.VisitCounterRepository;

// Spring 功能
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 訪客計數 (Service Layer) 負責處理與「計數」相關的所有業務邏輯。
 Controller 只負責收發請求，邏輯運算如判斷是否跨日、加總數字寫在 Service 層。
 讓程式碼更乾淨，方便單元測試。
 */
@Service // 告訴 Spring：這是一個負責邏輯的 Service
public class VisitService {

    // 宣告要用的工具 (這時候還是空的)
    private final VisitCounterRepository visitCounterRepository;

    // 建構子注入 (Constructor Injection)
    // Service 建立時，Repository 一定要存在，避免 NullPointerException
    // 單元測試時，可以直接 new VisitService(mockRepository) 傳入假資料庫
    public VisitService(VisitCounterRepository visitCounterRepository) { // 這是一個建構子，它的名字跟類別一樣
        // 把外面傳進來的 repo，指派給內部的變數
        this.visitCounterRepository = visitCounterRepository;
    }

    /**
     * 核心功能：增加訪客數
     * 加上 @Transactional 確保這一連串的讀寫操作是「原子性」的 (要嘛全成功，要嘛全失敗)
     */
    @Transactional
    public VisitCounter addVisit() {
        // 留 ID=1 的資料用來存全站計數
        // orElseThrow 是防呆機制，萬一資料庫是空的會報錯提醒
        VisitCounter counter = visitCounterRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("資料庫尚未初始化訪客計數器"));

        // 取得目前伺服器的日期
        LocalDate today = LocalDate.now();

        // 如果上次重製日期跟今天不同代表已經跨日，這時就歸零今日計數
        if (!today.equals(counter.getLastResetDate())) {
            counter.setTodayVisits(0L);
            counter.setLastResetDate(today);
        }

        // 跨月處理
        // withDayOfMonth(1) 是把日期都變成該月1號來比較，例如 2025-12-27 -> 2025-12-01
        if (!today.withDayOfMonth(1).equals(counter.getLastMonthResetDate().withDayOfMonth(1))) {
            counter.setMonthVisits(0L);
            counter.setLastMonthResetDate(today);
        }

        // 無論是否重置，總數、今日、本月都要 +1
        counter.setTotalVisits(counter.getTotalVisits() + 1);
        counter.setTodayVisits(counter.getTodayVisits() + 1);
        counter.setMonthVisits(counter.getMonthVisits() + 1);

        // 將修改後的物件存回資料庫，有 @Transactional 時 JPA 會自動偵測變更並存檔，但呼叫 .save() 可以讓程式更清楚，且能回傳更新後的物件
        return visitCounterRepository.save(counter);
    }

    // 後台管理介面查看數據用
    public VisitCounter getStatus() {
        return visitCounterRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Visit counter not initialized!"));
    }
}
