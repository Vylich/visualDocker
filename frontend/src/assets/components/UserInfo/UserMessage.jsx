import React from 'react'
import styles from './userMessage.module.scss'
import avatarDefault from '../../../img/avatar-default.svg'

const UserMessage = ({username, avatar, text, isNewMessage}) => {
	return (
		<div className={styles.root}>
			<img className={styles.image} src={avatar ? `${import.meta.env.VITE_APP_API_URL}${avatar}` : avatarDefault}/>
			<div className={styles.extra}>
				<span className={styles.username}>@{username}</span>
				<span className={styles.text}>{text}</span>
			</div>

			{isNewMessage && <span className={styles.notif}></span>}
		</div>
	)
}

export default UserMessage