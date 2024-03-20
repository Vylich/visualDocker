import React from 'react'
import styles from './Notif.module.scss'

const Notif = ({ unreadCount }) => {
	return (
		<>
			{!!unreadCount && (
				<div className={styles.root}>
					<span className={styles.notif}>{unreadCount}</span>
				</div>
			)}
		</>
	)
}

export default Notif
