import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const Home = () => {
  useEffect(() => {
    document.title = '廣翊輪胎館 - 專業輪胎與維修服務';
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>廣翊輪胎館</h1>
          <p className={styles.heroSubtitle}>您的行車安全，我們的專業承諾</p>
          <div className={styles.heroActions}>
            <Link to="/find-tires" className={styles.btnPrimary}>
              尋找愛車輪胎
            </Link>
            <Link to="/repair-services" className={styles.btnSecondary}>
              預約維修保養
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>專業服務項目</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🔧</div>
              <h3>輪胎更換</h3>
              <p>專業設備拆裝，確保輪胎與輪框完美貼合，行駛更平穩。</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>⚖️</div>
              <h3>四輪定位</h3>
              <p>精準雷射定位，解決吃胎、偏移問題，延長輪胎壽命。</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🔋</div>
              <h3>電瓶更換</h3>
              <p>檢測與更換各大品牌汽車電瓶，確保愛車隨時電力充沛。</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🛢️</div>
              <h3>快速保養</h3>
              <p>機油更換、濾網清潔，定期保養讓引擎維持最佳狀態。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>本月精選優惠</h2>
          <div className={styles.promotionBanner}>
            <div className={styles.promoText}>
              <h3>普利司通輪胎 全系列特價中</h3>
              <p>換四條輪胎即贈送精美禮品，數量有限送完為止！</p>
              <Link to="/promotions" className={styles.btnPrimary}>
                查看更多優惠
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About / Trust Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>為什麼選擇廣翊？</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <h3>20年經驗</h3>
              <p>在地深耕多年，累積豐富維修經驗，值得您信賴。</p>
            </div>
            <div className={styles.featureItem}>
              <h3>透明價格</h3>
              <p>所有服務與零件價格公開透明，絕無隱形消費。</p>
            </div>
            <div className={styles.featureItem}>
              <h3>原廠品質</h3>
              <p>堅持使用原廠或高品質認證零件，保障行車安全。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>聯絡我們</h2>
          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <p><strong>地址：</strong> 台中市神岡區中山路1196-2號</p>
              <p><strong>電話：</strong> (04)26511337</p>
              <p><strong>營業時間：</strong> 週一至週六 08:30 - 19:00</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className={styles.btnSecondary}
              >
                開啟 Google 地圖導航
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
