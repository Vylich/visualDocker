import React, { memo } from "react";
import clsx from "clsx";

import styles from "./Notif.module.scss";

const Notif = memo(({ isTab, unreadCount }) => {
  return (
    <>
      {!!unreadCount && (
        <div
          className={clsx(styles.root, {
            [styles.rootTab]: isTab,
          })}
        >
          <span className={styles.notif}>{unreadCount}</span>
        </div>
      )}
    </>
  );
});

export { Notif };
