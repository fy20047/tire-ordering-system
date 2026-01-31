import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        const hamburgerElement = navRef.current.querySelector(`.${styles.hamburger}`);
        if (hamburgerElement && !hamburgerElement.contains(event.target as Node)) {
          setMenuOpen(false);
        }
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoImageLink}>
          <img
            src="/images/bridgestone_logo.jpg"
            alt="Bridgestone Logo"
            width={120}
            height={40}
            className={styles.siteLogoImage}
          />
        </Link>
        <Link to="/" className={styles.siteTitleLink}>
          <span className={styles.siteTitle}>輪胎專賣店</span>
        </Link>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={menuOpen ? styles.line1Open : styles.line1}></div>
        <div className={menuOpen ? styles.line2Open : styles.line2}></div>
        <div className={menuOpen ? styles.line3Open : styles.line3}></div>
      </div>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
        <li>
          <Link to="/promotions" onClick={menuOpen ? toggleMenu : undefined} className={styles.promotionsLink}>
            優惠資訊
          </Link>
        </li>
        <li>
          <Link to="/find-tires" onClick={menuOpen ? toggleMenu : undefined}>
            尋找輪胎
          </Link>
        </li>
        <li>
          <Link to="/order" onClick={menuOpen ? toggleMenu : undefined}>
            訂購表單
          </Link>
        </li>
        <li>
          <Link to="/tire-series" onClick={menuOpen ? toggleMenu : undefined}>
            輪胎系列
          </Link>
        </li>
        <li>
          <Link to="/tire-knowledge" onClick={menuOpen ? toggleMenu : undefined}>
            輪胎知識
          </Link>
        </li>
        <li>
          <Link to="/repair-services" onClick={menuOpen ? toggleMenu : undefined}>
            維修價目表
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={menuOpen ? toggleMenu : undefined}>
            關於我們
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
