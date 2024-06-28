import React, { memo } from "react";
import styles from "./Tag.module.scss";

const Tag = memo(({ text }) => {
  return <span className={styles.tag}>#{text}</span>;
});

export { Tag };

