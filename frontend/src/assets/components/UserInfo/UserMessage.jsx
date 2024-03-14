import React from 'react'
import styles from './userMessage.module.scss'

const UserMessage = ({username, avatar, text}) => {
	return (
		<div className={styles.root}>
			<img className={styles.image} src={`http://127.0.0.1:8000${avatar}`}/>
			<div className={styles.extra}>
				<span className={styles.username}>@{username}</span>
				<span className={styles.text}>{text}</span>
			</div>
		</div>
	)
}

export default UserMessage