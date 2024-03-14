import React, {useState} from 'react'
import styles from './Notification.module.scss'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Notifications from '../../components/Notifications'
import Messages from '../../components/Messages'

const Nav = () => {
	return (
		<div className={styles.nav}>
			<NavLink
				className={({ isActive }) =>
					isActive ? `${styles.link} ${styles.isActive}` : styles.link
				}
				to='notices'
			>
				Уведомления
			</NavLink>
			<NavLink
				className={({ isActive }) =>
					isActive ? `${styles.link} ${styles.isActive}` : styles.link
				}
				to='messages'
			>
				Сообщения
			</NavLink>
		</div>
	)
}

const Notification = () => {

	return (
		<div className={styles.root}>
			<Nav />
			<Routes>
				<Route path='notices' element={<Notifications />} />
				<Route path='messages' element={<Messages />} />
			</Routes>
		</div>
	)
}

export default Notification
