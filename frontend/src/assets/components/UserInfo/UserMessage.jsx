import React from "react";
import styles from "./userMessage.module.scss";
import avatarDefault from "../../../img/avatar-default.svg";

const UserMessage = ({ username, avatar, text, isUnread }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src={avatar ? `https://visualapp.ru${avatar}` : avatarDefault}
      />
      <div className={styles.extra}>
        <span className={styles.username}>@{username}</span>
        <span className={styles.text}>{text}</span>
      </div>

      {isUnread && <span className={styles.notif}></span>}
    </div>
  );
};

export { UserMessage };
