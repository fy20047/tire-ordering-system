package com.fy20047.tireordering.backend.controller;

import com.fy20047.tireordering.backend.dto.ErrorResponse;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
// 不用在每個 Controller 自己 try/catch
public class GlobalExceptionHandler {

    // 表單填錯，當前端傳來的 JSON 違反了 DTO 裡的 @NotNull, @Min(1) 等規則時
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> details = new LinkedHashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) { // 抓出所有填錯的欄位整理成一個 Map
            details.put(error.getField(), error.getDefaultMessage());
        }
        ErrorResponse response = new ErrorResponse("Validation failed", details);
        return ResponseEntity.badRequest().body(response); // 回傳 400 Bad Request + 詳細的錯誤欄位清單
    }

    // 型別不對，前端傳來的資料型別跟後端要的不一樣
    // 網址是 /api/tires/{id}，後端要 Long (數字)，結果前端傳 /api/tires/abc (文字)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String message = "Invalid value for parameter: " + ex.getName();
        ErrorResponse response = new ErrorResponse(message, null);
        return ResponseEntity.badRequest().body(response); // 回傳 400 Bad Request + "Invalid value for parameter..."
    }

    // 參數邏輯錯誤（在 Service 裡手動寫的檢查）
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), null);
        return ResponseEntity.badRequest().body(response); // 回傳 400 Bad Request + 自行寫的錯誤訊息
    }

    // 狀態不對/衝突（業務邏輯上的狀態衝突）
    // 想買的輪胎 isActive 是 false（下架了），Service 拋出 IllegalStateException
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalState(IllegalStateException ex) {
        ErrorResponse response = new ErrorResponse(ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 回傳 409 Conflict (衝突)
    }

    // 其他例外狀況，可能是程式有 Bug（NullPointerException）、資料庫連不上、或是其他沒想到的錯誤
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex) {
        ErrorResponse response = new ErrorResponse("Internal server error", null); // 防止洩漏敏感資訊所以寫死而不是ex.getMessage()
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 回傳 500 Internal Server Error
    }
}
