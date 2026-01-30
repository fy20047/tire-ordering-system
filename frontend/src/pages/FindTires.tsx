import { useEffect } from 'react';
import styles from '../styles/FindTires.module.css';

const FindTires = () => {
  const bridgestoneSearchUrl = 'https://www.bridgestone.com.tw/zh/tire-category/all-tires';
  const catalogUrl = '/dm2025.pdf';

  useEffect(() => {
    document.title = '尋找輪胎 & 產品型錄 - 廣翊輪胎館';
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>尋找最適合您的普利司通輪胎</h1>
        <p>點擊下方按鈕，前往普利司通官方網站進行搜尋，或下載我們的最新產品型錄。</p>
      </section>

      <section className={styles.searchOptions}>
        <div className={styles.searchOption}>
          <h2>依車輛搜尋</h2>
          <p>前往官方網站，輸入您的車輛年份、廠牌、車系、車款進行搜尋。</p>
          <a
            href={bridgestoneSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.searchButton}
          >
            前往官方網站搜尋
          </a>
        </div>

        <div className={styles.searchOption}>
          <h2>依輪胎規格搜尋</h2>
          <p>前往官方網站，輸入胎面寬度、扁平比、輪圈直徑等規格進行搜尋。</p>
          <a
            href={bridgestoneSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.searchButton}
          >
            前往官方網站搜尋
          </a>
        </div>

        <div className={`${styles.searchOption} ${styles.catalogOption}`}>
          <h2>2025年產品型錄</h2>
          <p>下載最新的普利司通輪胎產品型錄，了解詳細規格與特色。</p>
          <a
            href={catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.searchButton}
          >
            下載型錄 (PDF)
          </a>
        </div>
      </section>
    </div>
  );
};

export default FindTires;
