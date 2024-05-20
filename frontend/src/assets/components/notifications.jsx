import React, { useEffect, useState, useRef } from "react";
import styles from "../components/Messages/Messages.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotificationsCount,
  addUnreadCount,
  addUnreadMessage,
  incrementUnreadCount,
  updateUnreadCount,
} from "../../redux/slices/notification";
import axios from "../../axios";

const WebSocketComponent = () => {
  const wsRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const createWebSocketConnection = () => {
      const accessToken = window.localStorage.getItem("accessff");

      wsRef.current = new WebSocket(
        `wss://visualapp.ru/ws/notifications/?token=${accessToken}`,
      );

      wsRef.current.onopen = () => {
        console.log("Подключено к WebSocket");
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(addUnreadMessage(data));
        console.log(data);

        if (data.type === "unread_type") {
          dispatch(addUnreadCount(Number(data.unread_count)));
        }

        if (data.type === "unread_count") {
          dispatch(updateUnreadCount(data.unread_count));
        }

        if (data.type === "new_message_notification") {
          dispatch(incrementUnreadCount());
        }
      };
    };

    createWebSocketConnection();

    const handleReconnect = () => {
      if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
        createWebSocketConnection();
      }
    };

    const interval = setInterval(handleReconnect, 10000);

    return () => {
      clearInterval(interval);
      wsRef.current?.close();
    };
  }, [window.localStorage.getItem("accessff")]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/notifications/push");
        if (response.data.message === "Новых уведомлений нет") {
          console.log("Новых уведомлений нет");
        } else {
          await axios.get("/notifications").then((res) => {
            console.log(res.data.count_notification);
            dispatch(addNotificationsCount(res.data.count_notification));
          });
        }
      } catch (error) {
        console.error("Ошибка при запросе:", error);
      }
    };
    fetchData();
    const interval = setInterval(
      () => {
        fetchData();
      },
      10 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return <></>;
};

export { WebSocketComponent };
