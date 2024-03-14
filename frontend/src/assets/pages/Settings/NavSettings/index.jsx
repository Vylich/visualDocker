import React, { useEffect, useState } from 'react'
import styles from './NavSettings.module.scss'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'

const NavSettings = ({ isNavVisible, hideNavOnClick, isNavVisibleOnClick }) => {
	return (
		<div className={isNavVisibleOnClick ? styles.root : styles.rootMobile}>
			<div className={styles.block}>
				{isNavVisible && <span>Аккаунт</span>}
				<NavLink
					onClick={hideNavOnClick}
					className={({ isActive }) =>
						isActive ? `${styles.link} ${styles.isActive}` : styles.link
					}
					to='edit-profile'
				>
					Изменение профиля
				</NavLink>
				<NavLink
					onClick={hideNavOnClick}
					className={({ isActive }) =>
						isActive ? `${styles.link} ${styles.isActive}` : styles.link
					}
					to='manage-account'
				>
					Управление аккаунтом
				</NavLink>
				<NavLink
					onClick={hideNavOnClick}
					className={({ isActive }) =>
						isActive ? `${styles.link} ${styles.isActive}` : styles.link
					}
					to='profile-visibility'
				>
					Видимость профиля
				</NavLink>
				{/* <NavLink
					onClick={hideNavOnClick}
					className={({ isActive }) =>
						isActive ? `${styles.link} ${styles.isActive}` : styles.link
					}
					to='notification'
				>
					Уведомления
				</NavLink> */}
			</div>
			<div className={isNavVisible ? styles.block : styles.blockNone}>
				<span>Информация</span>
				<Link onClick={hideNavOnClick} className={styles.link} to='terms-of-service'>Условия предоставления услуг</Link>
				<Link onClick={hideNavOnClick} className={styles.link} to='privacy-policy'>Политика конфиденциальности</Link>
			</div>
			<div className={isNavVisible ? styles.block : styles.blockNone}>
				<span>Вход</span>
				<Link onClick={hideNavOnClick} className={styles.link} to='/add-account'>Добавить аккаунт</Link>
				<button className={styles.logout} >Выход</button>
			</div>
		</div>
	)
}

export default NavSettings
