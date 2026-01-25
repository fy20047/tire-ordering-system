import styles from '../styles/PagePlaceholder.module.css';

type PagePlaceholderProps = {
  title: string;
};

const PagePlaceholder = ({ title }: PagePlaceholderProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.comingSoon}>頁面建置中</p>
    </div>
  );
};

export default PagePlaceholder;