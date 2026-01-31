import { useEffect } from 'react';
import styles from '../styles/RepairServices.module.css';

type ServiceItem = {
  name: string;
  price: string;
};

const servicesData: { leftColumn: ServiceItem[]; rightColumn: ServiceItem[] } = {
  leftColumn: [
    { name: '機油更換', price: '500' },
    { name: '變速箱油更換', price: '600' },
    { name: '煞車油更換', price: '600' },
    { name: '失壓續跑胎拆裝平衡工資', price: '600' },
    { name: '輪胎拆裝平衡(16吋以下)', price: '400' },
    { name: '輪胎拆裝平衡(17吋-19吋)', price: '500' },
    { name: '輪胎拆裝平衡(20吋以上)', price: '500' }
  ],
  rightColumn: [
    { name: '3D四輪定位', price: '1500' },
    { name: '輪胎平衡', price: '600' },
    { name: '外出工資', price: '300' },
    { name: '香菇頭補胎', price: '400' },
    { name: '失壓續跑胎香菇頭補胎', price: '600' },
    { name: '補胎(內)', price: '300' }
  ]
};

const RepairServices = () => {
  useEffect(() => {
    document.title = '維修價目表 - 廣翊輪胎館';
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>維修價目表</h1>
      <p className={styles.pageSubtitle}>透明公開的價格，讓您安心選擇所需服務。</p>

      <p className={`${styles.notes} ${styles.notesMovedUp}`}>
        * 以下價格僅供參考，實際費用可能因車型或特殊狀況而有所調整，詳情請洽現場服務人員。
      </p>

      <div className={styles.priceTable}>
        <div className={styles.column}>
          {servicesData.leftColumn.map((service, index) => (
            <div key={`left-${index}`} className={styles.serviceItem}>
              <span className={styles.serviceName}>{service.name}</span>
              <span className={styles.servicePrice}>{service.price}</span>
            </div>
          ))}
        </div>
        <div className={styles.column}>
          {servicesData.rightColumn.map((service, index) => (
            <div key={`right-${index}`} className={styles.serviceItem}>
              <span className={styles.serviceName}>{service.name}</span>
              <span className={styles.servicePrice}>{service.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepairServices;
