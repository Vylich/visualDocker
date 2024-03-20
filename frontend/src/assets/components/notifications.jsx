import React, { useEffect, useState, useRef } from 'react';
import styles from '../components/Messages/Messages.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUnreadCount,
  addUnreadMessage,
  incrementUnreadCount,
  updateUnreadCount,
} from '../../redux/slices/notification';

const WebSocketComponent = () => {
  const wsRef = useRef(null);
  const initialUnreadCount = useSelector(state => state.notif.initialUnreadCount);
  const unreadCount = useSelector(state => state.notif.unreadCount);
  const dispatch = useDispatch();

  useEffect(() => {
    // Функция для создания WebSocket соединения
    const createWebSocketConnection = () => {
      wsRef.current = new WebSocket(
        `${import.meta.env.VITE_APP_WS_URL}/ws/notifications/?token=${window.localStorage.getItem('access')}`
      );

      // Подключение
      wsRef.current.onopen = () => {
        console.log('Подключено к WebSocket');
      };

      // Обработка входящих сообщений
      wsRef.current.onmessage = event => {
        const data = JSON.parse(event.data);
        dispatch(addUnreadMessage(data));
        console.log(data);

        if (data.type === 'unread_type') {
          dispatch(addUnreadCount(Number(data.unread_count)));
        }

        if (data.type === 'unread_count') {
          dispatch(updateUnreadCount(data.unread_count));
        }

        if (data.type === 'new_message_notification') {
          dispatch(incrementUnreadCount());
        }
      };


    };

    // Создаем соединение при монтировании компонента
    createWebSocketConnection();

    // Функция для переподключения в случае разрыва связи
    const handleReconnect = () => {
      if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
        createWebSocketConnection();
      }
    };

    // Проверяем состояние соединения и переподключаемся, если необходимо
    const interval = setInterval(handleReconnect, 5000); // Каждые 5 секунд

    return () => {
      clearInterval(interval);
      wsRef.current?.close();
    };
  }, []); // Выполнится один раз при монтировании

  return (
    <>
    </>
  );
};

export default WebSocketComponent;
