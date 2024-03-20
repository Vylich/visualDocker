import React from 'react'
import styles from './Notif.module.scss'
import clsx from 'clsx'

const Notif = ({ isTab, unreadCount }) => {
	return (
		<>
			{!!unreadCount && (
				<div className={clsx(styles.root, {
					[styles.rootTab]: isTab,
				})}>
					<span className={styles.notif}>{unreadCount}</span>
				</div>
			)}
		</>
	)
}

export default Notif
