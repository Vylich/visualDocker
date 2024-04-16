import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


import styles from './UserInfo.module.scss'

import clsx from 'clsx'
import avatarDefault from '../../../img/avatar-default.svg'
import {
	getFollowerWord,
	getPostsWord,
	getSubscriptionsWord,
} from '../../../utils/declination'

import {ButtonSubs, Modal, ListUsers} from '@components'

import axios from '../../../axios'
import { fetchRemovePost } from '../../../redux/slices/posts'

function UserInfo({
	avatar,
	username,
	fullname,
	additionalInfo,
	isPost,
	isSmall,
	isProfile,
	email,
	followers,
	subscriptions,
	userId,
	posts,
	isContinue,
}) {
	const [isFollow, setIsFollow] = useState(false)
	const [isMe, setIsMe] = useState(false)
	const isUserDataLoaded = state => state.auth.data !== null
	const userData = useSelector(state =>
		isUserDataLoaded(state) ? state.auth.data : null
	)
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isSubscribersList, setIsSubscribersList] = useState(false)
	const [isFollowersList, setIsFollowersList] = useState(false)

	useEffect(() => {
		if (userData) {
			if (isProfile) {
				axios.get(`my_followers/${id}/`).then(res => {
					if (
						res.data.some(item => item.follower === Number(userData.user.id))
					) {
						setIsFollow(true)
					}
					if (Number(userId) === Number(userData.user.id)) {
						setIsMe(true)
					} else {
						setIsMe(false)
					}
				})
			} else if (isPost) {
				axios.get(`my_followers/${userId}/`).then(res => {
					if (
						res.data.some(item => item.follower === Number(userData.user.id))
					) {
						setIsFollow(true)
					}
					if (Number(userId) === Number(userData.user.id)) {
						setIsMe(true)
					} else {
						setIsMe(false)
					}
				})
			}
		}
	}, [id, userData])

	const handleSubscribe = async () => {
		try {
			const params = {
				author: Number(userId),
				follower: Number(userData.user.id),
			}
			await axios.post('subscribe/', params)
			const { data } = await axios.get(`my_followers/${userData.user.id}/`)
			if (data.some(item => item.follower === Number(userData.user.id))) {
				setIsFollow(true)
			} else {
				setIsFollow(false)
			}
			if (isFollow) {
				setIsFollow(false)
			} else {
				setIsFollow(true)
			}
		} catch (err) {
			console.warn(err)
			alert('Не удалось подписаться')
		}
	}

	const onClickRemove = () => {
		if (window.confirm('Вы правда хотите удалить пост?')) {
			dispatch(fetchRemovePost(id))
			navigate('/')
		}
	}

	return (
		<div
			className={clsx(styles.root, {
				[styles.rootFull]: isPost,
				[styles.rootSmall]: isSmall,
				[styles.rootContinue]: isContinue,
			})}
		>
			{!isProfile && !isSmall ? (
				<Link to={`/profile/${userId}`}>
					<img
						src={
							avatar
								? avatar.startsWith('blob')
									? avatar
									: `https://visualapp.ru${avatar}`
								: avatarDefault
						}
						alt={`Аватар пользователя ${username}`}
					/>
				</Link>
			) : (
				<img
					src={
						avatar
							? avatar.startsWith('blob')
								? avatar
								: `https://visualapp.ru${avatar}`
							: avatarDefault
					}
					alt={`Аватар пользователя ${username}`}
				/>
			)}
			<div className={styles.userDetails}>
				{!isProfile && !isSmall ? (
					<Link to={`/profile/${userId}`}>
						<span className={styles.userName}>@{username}</span>
					</Link>
				) : (
					<>
						<span className={styles.userName}>@{username}</span>
						<span className={styles.fullname}>{fullname}</span>
					</>
				)}
				{posts && (
					<div className={styles.additionals}>
						<span>
							{posts.length} {getPostsWord(posts.length)}
						</span>
						<span
							onClick={() => setIsFollowersList(true)}
							className={styles.buttonList}
						>
							{followers.length} {getFollowerWord(followers.length)}
						</span>
						<span
							onClick={() => setIsSubscribersList(true)}
							className={styles.buttonList}
						>
							{subscriptions.length}{' '}
							{getSubscriptionsWord(subscriptions.length)}
						</span>
						<Modal
							isVisible={isSubscribersList || isFollowersList}
							title={isSubscribersList ? 'Подписки' : 'Подписчики'}
							content={
								isSubscribersList ? (
									<ListUsers
										type={'subs'}
										users={subscriptions}
										typeMessage={'У вас пока нет подписок'}
									/>
								) : (
									<ListUsers
										type={'follows'}
										users={followers}
										typeMessage={'У вас пока нет подписчиков'}
									/>
								)
							}
							onClose={() => {
								setIsSubscribersList(false)
								setIsFollowersList(false)
							}}
						/>
					</div>
				)}
				{email && (
					<>
						<span className={styles.email}>{fullname}</span>
						<span className={styles.email}>{email}</span>
					</>
				)}
			</div>
			{userData && (
				<>
					{!isMe && isPost && (
						<div className={styles.btnSub}>
							<ButtonSubs
								handleSubscribe={handleSubscribe}
								isFollow={isFollow}
							/>
						</div>
					)}
					{isMe && isPost && (
						<div className={styles.manageBtns}>
							<div className={styles.btnManage}>
								<Link to={`/posts/${id}/edit`} className={styles.editBtn}>
									Редактировать
								</Link>
							</div>
							<div className={styles.btnManage}>
								<button onClick={onClickRemove} className={styles.editBtn}>
									Удалить
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export {UserInfo}
