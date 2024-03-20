import React, {useEffect, useState} from 'react'
import styles from './Notification.module.scss'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Notifications from '../../components/Notifications'
import Messages from '../../components/Messages'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../../../redux/slices/auth'

const Nav = () => {
	const unreadCount = useSelector(state => state.notif.unreadCount)

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
				{unreadCount > 0 && (<div className={styles.notif}><span>{unreadCount}</span></div>)}
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

export default Notification
