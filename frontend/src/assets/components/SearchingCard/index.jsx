import React, { memo, useCallback } from "react";
import styles from "./SearchingCard.module.scss";
import { Link } from "react-router-dom";

const Card = memo(({ onClickSearch, title, images }) => {
  return (
    <>
      {images && images[0] && (
        <Link
          to={`/posts/${title}`}
          key={images[0].id}
          onClick={useCallback(() => onClickSearch(title), [])}
          className={styles.root}
        >
          <img src={`https://visualapp.ru${images[0].image}`} width={50} />
          <div className={styles.wrapper}>
            <p>{title}</p>
          </div>
        </Link>
      )}
    </>
  );
});

export { Card };
