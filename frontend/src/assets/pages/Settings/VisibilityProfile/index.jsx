import React, { useState } from 'react'
import styles from './Visibility.module.scss'

const VisibilityProfile = () => {
	const [isChecked, setIsChecked] = useState(false)

	const handleChecked = () => {
		if (isChecked === true) {
			setIsChecked(false)
		} else {
			setIsChecked(true)
		}
	}
	return (
		<div className={styles.root}>
			<header className={styles.header}>
				<h2>Видимость профиля</h2>
				<p>Управляйте тем, как пользователи могут просматривать ваш профиль.</p>
			</header>
			<label className={styles.block}>
				<div className={styles.descr}>
					<h3>Частный профиль</h3>
					<p>
						Если у вас частный профиль, только одобренные вами люди могут
						просматривать его, а также ваших подписчиков и подписки.{' '}
					</p>
				</div>
				<label onClick={handleChecked} htmlFor='form-remember'>
					<input
						className={styles.hidden_checkbox}
						type='checkbox'
						name='policy'
						id='form-policy'
						checked={isChecked}
						readOnly
					/>
					<span className={styles.checkbox}></span>
				</label>
			</label>
		</div>
	)
}

export {VisibilityProfile}
