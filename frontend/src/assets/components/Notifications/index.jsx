import React from 'react'
import styles from './Notification.module.scss'
import Notification from '../Notification'

const Notifications = () => {
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<h3>Обновления</h3>
				<Notification type={'like'}/>
				<Notification type={'comment'}/>
				<Notification type={'subscribe'}/>
			</div>
		</div>
	)
}

export default Notifications