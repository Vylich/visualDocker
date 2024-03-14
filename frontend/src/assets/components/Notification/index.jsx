import React from 'react'
import styles from './Notification.module.scss'

const Notification = ({type}) => {
	return (
		<div className={styles.root}>
			{type === 'like' && (
				<>
					{' '}
					<header className={styles.header}>
						<img
							className={styles.avatar}
							src='https://loremflickr.com/500/500/people'
							alt=''
						/>
						<p>
							{' '}
							Пользователю под ником
							<span className={styles.username}> Vylich </span>
							<span className={styles.type}> понравился ваш пост </span>{' '}
							<span className={styles.titlePost}>Собака на поводке</span>{' '}
							<span className={styles.date}> 20 нед. </span>
						</p>
					</header>
					<div className={styles.postImg}>
						<img src='https://loremflickr.com/500/500/animals' alt='' />
					</div>
				</>
			)}
			{type === 'comment' && (
				<>
					{' '}
					<header className={styles.header}>
						<img
							className={styles.avatar}
							src='https://loremflickr.com/500/600/people'
							alt=''
						/>
						<p>
							{' '}
							Пользователь под ником
							<span className={styles.username}> Vylich </span>
							<span className={styles.type}> прокомментировал ваш пост: </span>{' '}
							<span className={styles.titlePost}>Собака на поводке</span>{' '}
							<span className={styles.date}> 2 часа </span>
						</p>
					</header>
					<div className={styles.postImg}>
						<img src='https://loremflickr.com/400/500/animals' alt='' />
					</div>
				</>
			)}
			{type === 'subscribe' && (
				<>
					{' '}
					<header className={styles.header}>
						<img
							className={styles.avatar}
							src='https://loremflickr.com/600/500/people'
							alt=''
						/>
						<p>
							{' '}
							Пользователь под ником
							<span className={styles.username}> Vylich </span>
							<span className={styles.type}> подписался на вас </span>{' '}
							<span className={styles.date}> 3 мин. </span>
						</p>
					</header>
				</>
			)}
		</div>
	)
}

export default Notification
