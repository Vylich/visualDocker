import React from 'react'
import styles from './Subs.module.scss'

const Subs = () => {
	return (
		<div className={styles.root}>
			<h2>Выберите подписку</h2>
			<div className={styles.wrapper}>
				<div className={styles.block}>
					<h3 className={styles.title}>Стандарт</h3>
					<div className={styles.subWrapper}>
					<p className={styles.descr}>При оформлении данной подписки вам больше не будет показываться реклама.</p>
					<button className={styles.btn}>300 ₽</button>
					</div>
				</div>
				<div className={styles.block}>
					<h3 className={styles.title}>Премиум</h3>
					<div className={styles.subWrapper}>
					<p className={styles.descr}>При оформлении данной подписки вам больше не будет показываться реклама, а так же ваши посты будут активнее продвигаться в рекомендациях других пользователей Visual.</p>
					<button className={styles.btn}>800 ₽</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Subs