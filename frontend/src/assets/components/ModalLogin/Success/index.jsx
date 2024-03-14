import React, { useState } from 'react';
import styles from '../ModalLogin.module.scss'
function AuthSuccessModal({ isOpen, onClose, username }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.modal_button} onClick={onClose}>&times;</span>
        <h2>Успешная авторизация</h2>
        <p>Добро пожаловать, {username}!</p>
      </div>
    </div>
  );
}

export default AuthSuccessModal;