import React, { useEffect, useState } from 'react'
import styles from './NavSettings.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../../redux/slices/auth'
import { clearMessages } from '../../../../redux/slices/notification'
import { removePostsState } from '../../../../redux/slices/posts'

const NavSettings = ({ isNavVisible, hideNavOnClick, isNavVisibleOnClick }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isUserDataLoaded = state => state.auth.data !== null
	const userData = useSelector(state =>
		isUserDataLoaded(state) ? state.auth.data : null
	)
	const users = JSON.parse(localStorage.getItem('users'))

	const onClickLogout = () => {
		if (window.confirm('Are you sure you want to log out?')) {
			dispatch(logout())
			navigate('/login')
			window.localStorage.removeItem('accessff')
			window.localStorage.removeItem('refresh')
			window.localStorage.removeItem('username')
			window.localStorage.removeItem('avatar')
			const users = JSON.parse(localStorage.getItem('users')) || []
			const invalidObj = users.find(item => item.username === userData.username)
			const newUsers = users.filter(item => item.username !== userData.username)
			console.log(invalidObj)
			if (newUsers.length) {
				window.localStorage.setItem('users', JSON.stringify(newUsers))
			} else {
				window.localStorage.removeItem('users')
			}
			dispatch(clearMessages())
			dispatch(removePostsState())
		}
	}

	useEffect(() => {}, [])

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
				<Link
					onClick={hideNavOnClick}
					className={styles.link}
					to='terms-of-service'
				>
					Условия предоставления услуг
				</Link>
				<Link
					onClick={hideNavOnClick}
					className={styles.link}
					to='privacy-policy'
				>
					Политика конфиденциальности
				</Link>
			</div>
			<div className={isNavVisible ? styles.block : styles.blockNone}>
				<span>Вход</span>
				{users && users.length > 1 ? (
					<Link
						onClick={hideNavOnClick}
						className={styles.link}
						to='change-account'
					>
						Сменить аккаунт
					</Link>
				) : (
					<Link onClick={hideNavOnClick} className={styles.link} to='/login'>
						Добавить аккаунт
					</Link>
				)}

				<button className={styles.logout} onClick={onClickLogout}>
					Выход
				</button>
			</div>
		</div>
	)
}

export {NavSettings}
