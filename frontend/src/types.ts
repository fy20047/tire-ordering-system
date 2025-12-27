// 定義訂單的樣子 (Interface)
// 跟後端 Entity 的欄位對應
export interface OrderFormData {
    customerName: string;
    phone: string;
    tireBrand: string;
    tireSeries: string;
    tireSize: string;
    quantity: number;
    installationOption: 'YES_INSTALL' | 'NO_PICKUP' | 'NO_DELIVERY'; // 使用 Union Type 限制只能填這三個
    deliveryAddress: string;
}

// 後端回傳的成功訊息格式 (看你的 OrderResponse)
export interface OrderResponse {
    id: number;
    customerName: string;
    status: string;
    // 其他需要的欄位
}