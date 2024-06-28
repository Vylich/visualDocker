import React, { memo } from "react";

import styles from "./ButtonSubs.module.scss";

const ButtonSubs = memo(({ handleSubscribe, isFollow }) => {
  return (
    <button
      onClick={handleSubscribe}
      className={isFollow ? styles.btnUnSubscribe : styles.btnSubscribe}
    >
      {isFollow ? "Отписаться" : "Подписаться"}
    </button>
  );
});

export { ButtonSubs };
