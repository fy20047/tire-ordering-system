import { PropsWithChildren } from 'react';
import Navbar from './Navbar.tsx';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>頁尾 輪胎專賣店</p>
      </footer>
    </>
  );
};

export default Layout;