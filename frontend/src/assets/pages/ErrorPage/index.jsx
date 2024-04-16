import React from 'react'
import styles from './ErrorPage.module.scss'

const ErrorPage = () => {
	return (
		<div className={styles.root}>
			<h1>404 ошибка</h1>
			<p>попробуйте перезагрузить страницу или вернуться позже</p>
		</div>
	)
}

export {ErrorPage}