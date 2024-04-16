import React from 'react'
import styles from './Tag.module.scss'

const Tag = ({text}) => {
	return (
		<span className={styles.tag}>#{text}</span>
	)
}

export {Tag}