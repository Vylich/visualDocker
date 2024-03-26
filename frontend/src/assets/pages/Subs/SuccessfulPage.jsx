import React from 'react'
import styles from './Subs.module.scss'

const SuccessfulPage = () => {
	return (
		<div className={styles.root}>
			<h2>Спасибо за подписку!</h2>
			<p className={styles.descr}>Теперь вы можете пользоваться приложением дальше, в течение некоторого времени подписка активируется.</p>
		</div>
	)
}

export default SuccessfulPage
