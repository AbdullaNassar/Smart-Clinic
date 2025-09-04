import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>الصفحة التي تبحث عنها غير موجودة</p>
      <Link to="/" className={styles.homeButton}>
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;
