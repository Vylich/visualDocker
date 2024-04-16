import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './Notification.module.scss'

import axios from '../../../axios'
import avatarDefault from '../../../img/avatar-default.svg'

import { removeApiUrl } from '../Post'

const Notification = ({ type, post, user, avatar }) => {
	const [userState, setUser] = useState({})
	const [postState, setPost] = useState({})
	const isUserDataLoaded = state => state.auth.data !== null
	const userdata = useSelector(state =>
		isUserDataLoaded(state) ? state.auth.data.user : null
	)

	useEffect(() => {
		if (type === 'like' || type === 'subscribe') {
			axios.get(`users/${user}`).then(res => {
				setUser(res.data)
			})
		}
		if (type === 'comment') {
			axios.get(`/posts/${post}`).then(res => {
				setPost(res.data)
				console.log(res.data)
			})
		}
	}, [type])

	return (
		<div className={styles.root}>
			{type === 'like' && user !== userdata.id && (
				<>
					<header className={styles.header}>
						<Link to={`/profile/${user}`}>
							<img
								className={styles.avatar}
								src={
									userState.avatar
										? `https://visualapp.ru${userState.avatar}`
										: avatarDefault
								}
								alt=''
							/>
						</Link>
						<p>
							Пользователю под ником
							<span className={styles.username}>
								{' '}
								{userState && userState.username}{' '}
							</span>
							<span className={styles.type}> понравился ваш пост </span>
							<span className={styles.titlePost}>{post.name}</span>
							{/* <span className={styles.date}> 20 нед. </span> */}
						</p>
					</header>
					<div className={styles.postImg}>
						<Link to={`/posts/${post.slug}`}>
							{post.image[0] ? (
								<img
									src={`https://visualapp.ru${post.image[0].image}`}
									alt=''
								/>
							) : (
								<video
									src={`https://visualapp.ru${post.video[0].video}`}
									alt=''
								/>
							)}
						</Link>
					</div>
				</>
			)}
			{type === 'comment' && user !== userdata.username && (
				<>
					<header className={styles.header}>
						<Link to={`/profile/${user}`}>
							<img
								className={styles.avatar}
								src={
									avatar
										? `https://visualapp.ru/media/${avatar}`
										: avatarDefault
								}
								alt=''
							/>
						</Link>
						<p>
							Пользователь под ником
							<span className={styles.username}> {user} </span>
							<span className={styles.type}> прокомментировал ваш пост: </span>
							<span className={styles.titlePost}>{postState.name}</span>
							{/* <span className={styles.date}> 2 часа </span> */}
						</p>
					</header>
					<div className={styles.postImg}>
						<Link to={`/posts/${post}`}>
							<img
								src={
									postState.image
										? `${removeApiUrl(postState.image[0].image)}`
										: ''
								}
								alt=''
							/>
						</Link>
					</div>
				</>
			)}
			{type === 'subscribe' && (
				<>
					<header className={styles.header}>
						<Link to={`/profile/${user}`}>
							<img
								className={styles.avatar}
								src={
									userState.avatar
										? `${removeApiUrl(userState.avatar)}`
										: avatarDefault
								}
								alt=''
							/>
						</Link>
						<p>
							Пользователь под ником
							<span className={styles.username}>
								{' '}
								{userState && userState.username}{' '}
							</span>
							<span className={styles.type}> подписался на вас </span>
							{/* <span className={styles.date}> 3 мин. </span> */}
						</p>
					</header>
				</>
			)}
		</div>
	)
}

export {Notification}
