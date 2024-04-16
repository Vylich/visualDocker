import React, { useEffect, useState } from 'react'

import styles from './PostDetails.module.scss'

import {UserInfo, CommentsBlock, AddComment, Tag, CommentsList} from '@components'

import avatar from '../../../img/avatar-default.svg'

import axios from '../../../axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {
	getCommentWord,
	getLikesWord,
	getViewsWord,
} from '../../../utils/declination'

import { jwtDecode as jwt } from 'jwt-decode'

import { useDispatch, useSelector } from 'react-redux'
import { fetchOtherUser } from '../../../redux/slices/auth'

const PostDetails = ({
	username,
	slug,
	comments,
	onSubmit,
	post,
	isLiked,
	likes,
	setLikes,
	setIsLiked,
	userId,
	onSubmitChild,
	onDeleteComment,
}) => {
	const dispatch = useDispatch()
	const userdata = useSelector(state => state.auth.user)
	const myUser = useSelector(state => state.auth.data)

	const dateStr = date => {
		const dateString = new Date(date)
		const options = { day: 'numeric', month: 'long', year: 'numeric' }
		return dateString.toLocaleDateString('ru-RU', options)
	}

	useEffect(() => {
		dispatch(fetchOtherUser(userId))
	}, [userId])

	const toggleLike = async () => {
		try {
			if (isLiked) {
				await axios.post(`/posts/${slug}/unlike/`)
				setLikes(likes - 1)
				setIsLiked(false)
			}
			if (!isLiked) {
				await axios.post(`/posts/${slug}/like/`)
				setLikes(likes + 1)
				setIsLiked(true)
			}
		} catch (err) {
			console.warn(err)
			alert('Bad liked')
		}
	}

	return (
		<div className={styles.root}>
			<UserInfo
				username={username}
				userId={userId}
				avatar={userdata && userdata.avatar ? userdata.avatar : null}
				isPost
			/>

			<div className={styles.postInfo}>
				<h2>{post.name}</h2>
				<p>{post.text}</p>
				<div className={styles.tags}>
					{post.tags && post.tags.map((obj, i) => <Tag key={i} text={obj} />)}
				</div>
			</div>

			<div className={styles.comments}>
				<CommentsList
					comments={comments}
					onDeleteComment={onDeleteComment}
					onSubmitChild={onSubmitChild}
					isChild={false}
					isChildParent={false}
				/>
			</div>
			<div className={styles.manage}>
				<div className={styles.wrap}>
					<div className={styles.commentsInfo}>
						{post.avialable_comment ? (
							comments.length < 1 ? (
								<span>Здесь пока нет комментариев</span>
							) : (
								<span>
									{comments.length} {getCommentWord(comments.length)}
								</span>
							)
						) : (
							<span>Пользователь не разрешил комментировать</span>
						)}
					</div>
					<div className={styles.likesWrapper}>
						<span>
							{likes} {getLikesWord(likes)}
						</span>
						<button
							onClick={toggleLike}
							disabled={!myUser}
							className={styles.likes}
						>
							<FontAwesomeIcon
								icon={faHeart}
								className={isLiked ? styles.like : styles.unlike}
							/>
						</button>
					</div>
				</div>
				<span className={styles.date}>{dateStr(post.created_date)}</span>
				<span className={styles.date}>
					{post.view_count} {getViewsWord(post.view_count)}
				</span>
			</div>
			{myUser && (
				<>
					{post.avialable_comment && (
						<AddComment user={username} onSubmit={onSubmit} />
					)}
				</>
			)}
		</div>
	)
}

export {PostDetails}
