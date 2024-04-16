import React, {useEffect, useState} from 'react'
import styles from './Notification.module.scss'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import {Notifications, Messages, Notif} from '@components'

import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../../../redux/slices/auth'


const Nav = () => {
	const unreadCount = useSelector(state => state.notif.unreadCount)
	const unreadNotifCount = useSelector(state => state.notif.notificationsCount)


	return (
		<div className={styles.nav}>
			<NavLink
				className={({ isActive }) =>
					isActive ? `${styles.link} ${styles.isActive}` : styles.link
				}
				to='notices'
			>
				Уведомления
				{unreadNotifCount > 0 && (<Notif isTab unreadCount={unreadNotifCount} />)}
			</NavLink>
			<NavLink
				className={({ isActive }) =>
					isActive ? `${styles.link} ${styles.isActive}` : styles.link
				}
				to='messages'
			>
				Сообщения
				{unreadCount > 0 && (<Notif isTab unreadCount={unreadCount} />)}
			</NavLink>
		</div>
	)
}

const Notification = () => {
	const isUserDataLoaded = state => state.auth.data !== null
	const userdata = useSelector(state =>
		isUserDataLoaded(state) ? state.auth.data.user : null
	)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchLogin())
	}, [])

	return (
		<div className={styles.root}>
			<Nav />
			<div className={styles.wrap}>
			<Routes>
				<Route path='notices' element={<Notifications />} />
				<Route path='messages' element={<Messages id={userdata && userdata.id} />} />
			</Routes>
			</div>
		</div>
	)
}

export {Notification}
