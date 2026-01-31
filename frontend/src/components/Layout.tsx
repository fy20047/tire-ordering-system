import { PropsWithChildren } from 'react';
import Navbar from './Navbar.tsx';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2026 廣翊輪胎館</p>
          <a href="tel:0426511337">📞 (04) 2651-1337</a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=台中市神岡區中山路1196-2號"
            target="_blank"
            rel="noreferrer"
          >
          📍 台中市神岡區中山路1196-2號
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
