import React, { memo } from "react";
import styles from "./Notification.module.scss";

const NotificationSettings = memo(() => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2>Уведомления</h2>
        <p>
          Мы обязательно будем сообщать вам о любых важных изменениях, а темы
          остальных уведомлений вы можете выбрать сами.
        </p>
      </header>
      <div className={styles.fieldBusiness}>
        <div>
          <h4>В Visual</h4>
          <p>
            Выберите, какие уведомления будут отображаться в приложении или на
            сайте.
          </p>
        </div>
        <button>Изменить</button>
      </div>
      <div className={styles.fieldBusiness}>
        <div>
          <h4>По электронной почте</h4>
          <p>
            Выберите, какие уведомления будут приходить по электронной почте.
          </p>
        </div>
        <button>Изменить</button>
      </div>
      <div className={styles.fieldBusiness}>
        <div>
          <h4>Push-уведомления</h4>
          <p>
            Выберите, какие уведомления будут приходить на телефон или
            компьютер.
          </p>
        </div>
        <button>Изменить</button>
      </div>
    </div>
  );
});

export { NotificationSettings };
