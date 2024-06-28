import React, { memo } from "react";
import styles from "./Subs.module.scss";
import axios from "../../../axios";

const Subs = memo(() => {
  const handleClickPay = useCallback(async (type, price) => {
    const config = {
      subscription: type,
      value: price,
    };
    const { data } = await axios.post("create_payment/", config);

    window.location.href = data.confirmation_url;
  }, []);

  return (
    <div className={styles.root}>
      <h2>Выберите подписку</h2>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h3 className={styles.title}>Стандарт</h3>
          <div className={styles.subWrapper}>
            <p className={styles.descr}>
              При оформлении данной подписки вам больше не будет показываться
              реклама.
            </p>
            <button
              onClick={() => handleClickPay("standard", "300")}
              className={styles.btn}
            >
              300 ₽
            </button>
          </div>
        </div>
        <div className={styles.block}>
          <h3 className={styles.title}>Премиум</h3>
          <div className={styles.subWrapper}>
            <p className={styles.descr}>
              При оформлении данной подписки вам больше не будет показываться
              реклама, а так же ваши посты будут активнее продвигаться в
              рекомендациях других пользователей Visual.
            </p>
            <button
              onClick={() => handleClickPay("premium", "800")}
              className={styles.btn}
            >
              800 ₽
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export { Subs };

