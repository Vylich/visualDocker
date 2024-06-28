import React, { memo, useEffect } from "react";
import styles from "./Notification.module.scss";
import { Notification } from "@components";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotificationsAll,
  removeNotificationsCount,
} from "../../../redux/slices/notification";

const Notifications = memo(() => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notif.notificationsAll);

  useEffect(() => {
    axios
      .get("notifications/list/")
      .then((res) => {
        dispatch(addNotificationsAll(res.data));
        dispatch(removeNotificationsCount());
      })
      .catch(dispatch(addNotificationsAll("")));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h3>Обновления</h3>
        {notifications ? (
          <>
            {!!notifications.likes && (
              <>
                {notifications.likes.map((like, i) => (
                  <Notification
                    key={i}
                    post={like.post}
                    user={like.user}
                    type={"like"}
                  />
                ))}
              </>
            )}
            {!!notifications.comments && (
              <>
                {notifications.comments.map((comment, i) => (
                  <Notification
                    key={i}
                    post={comment.post}
                    user={comment.author}
                    avatar={comment.author_avatar}
                    type={"comment"}
                  />
                ))}
              </>
            )}
            {!!notifications.followers && (
              <>
                {notifications.followers.map((follower, i) => (
                  <Notification
                    key={i}
                    user={follower.follower}
                    type={"subscribe"}
                  />
                ))}
              </>
            )}
          </>
        ) : (
          <span className={styles.notificationNone}>Уведомлений нет</span>
        )}
      </div>
    </div>
  );
});

export { Notifications };

