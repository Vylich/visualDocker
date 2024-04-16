import React, { useState } from 'react';

import styles from '../ModalLogin.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function AuthErrorModal({ isOpen, onClose, errorMessage }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.modal_button} onClick={onClose}><FontAwesomeIcon icon={faXmark} /></span>
        <h2>Ошибка авторизации</h2>
        <p>Проверьте логин или пароль</p>
      </div>
    </div>
  );
}

export {AuthErrorModal};
