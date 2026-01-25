import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/TireOrder.module.css';

type Tire = {
  id: number;
  brand: string;
  series: string;
  size: string;
  price: number | null;
  isActive?: boolean;
};

type OrderFormData = {
  customerName: string;
  phone: string;
  email: string;
  quantity: string;
  installationOption: 'INSTALL' | 'PICKUP' | 'DELIVERY';
  deliveryAddress: string;
  carModel: string;
  notes: string;
};

type SubmitStatus = 'success' | 'error' | null;

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const tireIdParam = searchParams.get('tireId');
  const parsedTireId = tireIdParam ? Number(tireIdParam) : null;
  const hasTireId = parsedTireId !== null && Number.isFinite(parsedTireId);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;

  const [tireOptions, setTireOptions] = useState<Tire[]>([]);
  const [selectedTireId, setSelectedTireId] = useState<number | null>(null);
  const [selectedTire, setSelectedTire] = useState<Tire | null>(null);
  const [isTireLocked, setIsTireLocked] = useState(false);
  const [tireLoading, setTireLoading] = useState(true);
  const [tireError, setTireError] = useState<string | null>(null);

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    phone: '',
    email: '',
    quantity: '1',
    installationOption: 'INSTALL',
    deliveryAddress: '',
    carModel: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [orderId, setOrderId] = useState<number | string | null>(null);

  const selectedTireLabel = useMemo(() => {
    if (!selectedTire) {
      return '';
    }
    const priceText = selectedTire.price !== null ? `${selectedTire.price} 元` : '價格另洽';
    return `${selectedTire.brand} ${selectedTire.series} ${selectedTire.size}（${priceText}）`;
  }, [selectedTire]);

  useEffect(() => {
    let isActive = true;

    const loadTires = async () => {
      if (!apiBaseUrl) {
        setTireError('API Base URL 未設定，請先設定 .env。');
        setTireLoading(false);
        return;
      }

      setTireLoading(true);
      setTireError(null);

      if (hasTireId && parsedTireId !== null) {
        try {
          const response = await fetch(`${apiBaseUrl}/api/tires/${parsedTireId}`);
          if (response.ok) {
            const tire = (await response.json()) as Tire;
            if (!isActive) return;
            setTireOptions([tire]);
            setSelectedTireId(tire.id);
            setSelectedTire(tire);
            setIsTireLocked(true);
            setTireLoading(false);
            return;
          }
        } catch (error) {
          // Fall back to list if single tire fetch fails
        }
      }

      try {
        const response = await fetch(`${apiBaseUrl}/api/tires?active=true`);
        if (!response.ok) {
          throw new Error('Failed to load tires');
        }
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.items ?? []);
        if (!isActive) return;
        setTireOptions(items);
        if (hasTireId && parsedTireId !== null) {
          const matched = items.find((item: Tire) => item.id === parsedTireId);
          if (matched) {
            setSelectedTireId(matched.id);
            setSelectedTire(matched);
            setIsTireLocked(true);
          } else {
            setTireError('找不到指定輪胎，請手動選擇。');
            setIsTireLocked(false);
          }
        }
      } catch (error) {
        if (!isActive) return;
        setTireError('無法載入輪胎清單，請稍後再試。');
      } finally {
        if (isActive) {
          setTireLoading(false);
        }
      }
    };

    loadTires();

    return () => {
      isActive = false;
    };
  }, [apiBaseUrl, hasTireId, parsedTireId]);

  useEffect(() => {
    if (!selectedTireId || isTireLocked) {
      if (!selectedTireId) {
        setSelectedTire(null);
      }
      return;
    }
    const matched = tireOptions.find((item) => item.id === selectedTireId) ?? null;
    setSelectedTire(matched);
  }, [selectedTireId, tireOptions, isTireLocked]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'installationOption' && value !== 'DELIVERY'
        ? { deliveryAddress: '' }
        : {})
    }));
  };

  const handleTireSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextId = event.target.value ? Number(event.target.value) : null;
    setSelectedTireId(nextId);
    if (nextId === null) {
      setSelectedTire(null);
      return;
    }
    const matched = tireOptions.find((item) => item.id === nextId) ?? null;
    setSelectedTire(matched);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!apiBaseUrl) {
      setSubmitStatus('error');
      setSubmitMessage('API Base URL 未設定，請先設定 .env。');
      return;
    }

    if (!selectedTireId) {
      setSubmitStatus('error');
      setSubmitMessage('請先選擇輪胎。');
      return;
    }

    if (!formData.customerName.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('請填寫姓名。');
      return;
    }

    if (!formData.phone.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('請填寫聯絡電話。');
      return;
    }

    if (!formData.carModel.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('請填寫車款資訊。');
      return;
    }

    if (formData.installationOption === 'DELIVERY' && !formData.deliveryAddress.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('請填寫配送地址。');
      return;
    }

    const quantityNumber = Number(formData.quantity);
    if (!Number.isFinite(quantityNumber) || quantityNumber < 1) {
      setSubmitStatus('error');
      setSubmitMessage('請填寫正確的數量。');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');
    setOrderId(null);

    const payload = {
      tireId: selectedTireId,
      quantity: quantityNumber,
      customerName: formData.customerName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      installationOption: formData.installationOption,
      deliveryAddress:
        formData.installationOption === 'DELIVERY' ? formData.deliveryAddress.trim() : null,
      carModel: formData.carModel.trim(),
      notes: formData.notes.trim() || undefined
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || '訂單已送出，客服將與您聯繫確認。');
        setOrderId(result.orderId ?? result.id ?? null);
        setFormData((prev) => ({
          ...prev,
          customerName: '',
          phone: '',
          email: '',
          quantity: '1',
          installationOption: 'INSTALL',
          deliveryAddress: '',
          carModel: '',
          notes: ''
        }));
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message || '訂單送出失敗，請稍後再試。');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('訂單送出失敗，請確認網路連線或稍後再試。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>輪胎訂購</h1>
      <p className={styles.pageSubtitle}>選擇輪胎後填寫基本資料，送出後客服將與您聯繫。</p>

      {submitStatus === 'success' && (
        <div className={`${styles.submitMessage} ${styles.successMessage}`}>
          <div>{submitMessage}</div>
          {orderId && <div>訂單編號：{orderId}</div>}
        </div>
      )}

      {submitStatus === 'error' && (
        <div className={`${styles.submitMessage} ${styles.errorMessage}`}>{submitMessage}</div>
      )}

      <form onSubmit={handleSubmit} className={styles.orderForm}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>輪胎資訊</legend>
          {tireLoading ? (
            <p className={styles.helperText}>輪胎清單載入中...</p>
          ) : (
            <>
              {tireError && <p className={styles.helperText}>{tireError}</p>}
              <div className={styles.formGroup}>
                <label htmlFor="tireId" className={styles.label}>
                  選擇輪胎 <span className={styles.required}>*</span>
                </label>
                <select
                  id="tireId"
                  name="tireId"
                  value={selectedTireId ?? ''}
                  onChange={handleTireSelect}
                  className={styles.input}
                  disabled={isTireLocked}
                >
                  <option value="">請選擇輪胎</option>
                  {tireOptions.map((tire) => (
                    <option key={tire.id} value={tire.id}>
                      {tire.brand} {tire.series} {tire.size}
                      {tire.price !== null ? ` - ${tire.price} 元` : ''}
                    </option>
                  ))}
                </select>
                {isTireLocked && (
                  <p className={styles.helperText}>此輪胎由促銷頁帶入，已鎖定。</p>
                )}
              </div>
              {selectedTire && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>已選擇輪胎</label>
                  <input type="text" className={styles.input} value={selectedTireLabel} disabled />
                </div>
              )}
            </>
          )}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>訂購人資料</legend>
          <div className={styles.formGroup}>
            <label htmlFor="customerName" className={styles.label}>
              姓名 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              聯絡電話 <span className={styles.required}>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>服務方式</legend>
          <div className={styles.formGroup}>
            <label htmlFor="installationOption" className={styles.label}>
              安裝/配送方式 <span className={styles.required}>*</span>
            </label>
            <select
              id="installationOption"
              name="installationOption"
              value={formData.installationOption}
              onChange={handleInputChange}
              className={styles.input}
              required
            >
              <option value="INSTALL">到店安裝</option>
              <option value="PICKUP">到店取貨</option>
              <option value="DELIVERY">住家配送</option>
            </select>
            <p className={styles.helperText}>配送才需要填地址，其他方式免填。</p>
          </div>
          {formData.installationOption === 'DELIVERY' && (
            <div className={styles.formGroup}>
              <label htmlFor="deliveryAddress" className={styles.label}>
                配送地址 <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
          )}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>車款資訊</legend>
          <div className={styles.formGroup}>
            <label htmlFor="carModel" className={styles.label}>
              車款資訊 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              value={formData.carModel}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="例：Toyota Altis 2019"
              required
            />
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>備註</legend>
          <div className={styles.formGroup}>
            <label htmlFor="notes" className={styles.label}>備註（預約時間或其他需求）</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={4}
              placeholder="例：希望平日晚上安裝、請先電話聯繫"
            />
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>數量</legend>
          <div className={styles.formGroup}>
            <label htmlFor="quantity" className={styles.label}>
              訂購數量 <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className={styles.input}
              min="1"
              required
            />
          </div>
        </fieldset>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? '送出中...' : '送出訂單'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
