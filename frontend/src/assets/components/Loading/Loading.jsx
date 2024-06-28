import React, { memo } from "react";

import styles from "./Loading.module.scss";

const Loading = memo(() => {
  return (
    <div className={styles.outer}>
      <div className={styles.middle}>
        <div className={styles.inner}></div>
      </div>
      <span className={styles.text}>Загрузка</span>
    </div>
  );
});

export { Loading };
