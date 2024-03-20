import React, { useEffect, useState } from 'react'
import styles from './Notification.module.scss'
import axios from '../../../axios'
import avatarDefault from '../../../img/avatar-default.svg'

const Notification = ({ type, post, user, avatar }) => {
	const [userState, setUser] = useState({})
	const [postState, setPost] = useState({})

	useEffect(() => {
		if (type === 'like' || type === 'subscribe') {
			axios.get(`users/${user}`).then(res => {
				setUser(res.data)
			})
		}
		if (type === 'like' || type === 'comment') {
			axios.get(`/posts/${post}`).then(res => {
				setPost(res.data)
			})
		}

	}, [type])


	return (
		<div className={styles.root}>
			{type === 'like' && (
				<>
					<header className={styles.header}>
						<img
							className={styles.avatar}
							src={userState.avatar ? `${import.meta.env.VITE_APP_API_URL}${userState.avatar}` : avatarDefault}
							alt=''
						/>
						<p>
							Пользователю под ником
							<span className={styles.username}> {userState && userState.username} </span>
							<span className={styles.type}> понравился ваш пост </span>
							<span className={styles.titlePost}>{post}</span>
							{/* <span className={styles.date}> 20 нед. </span> */}
						</p>
					</header>
					<div className={styles.postImg}>
						<img src='https://loremflickr.com/500/500/animals' alt='' />
					</div>
				</>
			)}
			{type === 'comment' && (
				<>
					<header className={styles.header}>
						<img
							className={styles.avatar}
							src={avatar ? `${import.meta.env.VITE_APP_API_URL}/media/${avatar}` : avatarDefault}
							alt=''
						/>
						<p>
							Пользователь под ником
							<span className={styles.username}> {user} </span>
							<span className={styles.type}> прокомментировал ваш пост: </span>
							<span className={styles.titlePost}>{post}</span>
							{/* <span className={styles.date}> 2 часа </span> */}
						</p>
					</header>
					<div className={styles.postImg}>
						<img src='https://loremflickr.com/400/500/animals' alt='' />
					</div>
				</>
			)}
			{type === 'subscribe' && (
				<>
					<header className={styles.header}>
						<img
							className={styles.avatar}
							src={userState.avatar ? `${import.meta.env.VITE_APP_API_URL}${userState.avatar}` : avatarDefault}
							alt=''
						/>
						<p>
							Пользователь под ником
							<span className={styles.username}> {userState && userState.username} </span>
							<span className={styles.type}> подписался на вас </span>
							<span className={styles.date}> 3 мин. </span>
						</p>
					</header>
				</>
			)}
		</div>
	)
}

export default Notification
