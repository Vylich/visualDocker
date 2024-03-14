import clsx from 'clsx'
import React from 'react'
import styles from './Skeleton.module.scss'
const Skeleton = ({isHome, isFull, isUser}) => {
	return (
		<div className={clsx(styles.root, {
			[styles.rootFull]: isFull,
			[styles.rootHome]: isHome,
			[styles.rootUser]: isUser
		})}></div>
	)
}

export default Skeleton