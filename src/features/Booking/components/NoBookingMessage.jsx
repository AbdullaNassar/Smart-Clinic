import { CalendarX } from "lucide-react";
import styles from "./NoBookingMessage.module.css";

const NoBookingsMessage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <div className={styles.iconCircle}>
          <CalendarX className="w-10 h-10 text-gray-400" />
        </div>
        <div className={styles.badge}>
          <div className={styles.badgeInner}></div>
        </div>
      </div>

      <h3 className={styles.title}>لا توجد حجوزات اليوم</h3>

      <div className={styles.decoration}>
        <div className={styles.dotBlueLarge}></div>
        <div className={styles.dotGray}></div>
        <div className={styles.dotBlueSmall}></div>
        <div className={styles.dotGraySmall}></div>
      </div>
    </div>
  );
};

export default NoBookingsMessage;
