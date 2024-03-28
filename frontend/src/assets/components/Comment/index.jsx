import React, { useState } from 'react'
import styles from './Comments.module.scss'
import UserInfo from '../UserInfo'
import AddComment from '../AddComment'
import axios from '../../../axios'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import avatarDefault from '../../../img/avatar-default.svg'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const CommentsBlock = ({
	text,
	avatarUrl,
	username,
	onSubmitChild,
	idComment,
	isChild,
	isChildParent,
	level,
	onDeleteComment,
	paddingFromBtn,
}) => {
	const [isAnswer, setIsAnswer] = useState(false)
	const [usernameReply, setUsernameReply] = useState('')
	const userdata = useSelector(state => state.auth.data)
	const onSetUsernameReply = user => {
		setUsernameReply(user)
		console.log(user)
	}

	const formatText = text => {
		const regex = /(@\w+)/g
		return text.split(regex).map((part, index) => {
			if (part.match(regex)) {
				if (isChildParent) {
					return (
						<span className={styles.usernameReply} key={index}>
							{part}
						</span>
					)
				} else {
					return (
						<span className={styles.usernameReplyHidden} key={index}>
							{part}
						</span>
					)
				}
			}
			return part
		})
	}

	return (
		<div
			className={clsx(styles.root, {
				[styles.rootChild]: isChild,
				[styles.rootChildParent]: isChildParent,
				[styles.deletedComment]: !text,
				[styles.paddingFromBtn]: paddingFromBtn,
			})}
		>
			<div className={styles.wrapper}>
				<img
					src={
						avatarUrl
							? `http://${window.location.hostname}:8000/media/${avatarUrl}`
							: avatarDefault
					}
					alt={`Аватар пользователя ${username}`}
				/>
				<p>
					<span className={styles.username}>@{username}</span>{' '}
					{text ? formatText(text) : 'Deleted comment'}
				</p>
			</div>
			{text && (
				<button
					className={styles.answerBtn}
					onClick={() => {
						setIsAnswer(true)
					}}
				>
					ответить
				</button>
			)}{' '}
			{userdata && userdata.user.username === username && text && (
				<button
					onClick={() => onDeleteComment(idComment)}
					className={styles.btnDel}
				>
					<FontAwesomeIcon icon={faTrash} />
				</button>
			)}
			{isAnswer && (
				<div className={styles.answerBlock}>
					<AddComment
						user={username}
						onSubmitChild={onSubmitChild}
						idComment={idComment}
						setIsAnswer={setIsAnswer}
						onSetUsernameReply={onSetUsernameReply}
					/>
				</div>
			)}
		</div>
	)
}

export default CommentsBlock
