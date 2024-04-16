import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../axios'

import {UserInfo} from '@components'

import styles from './ListUsers.module.scss'

const ListUsers = ({ users, typeMessage, type }) => {
	const [usersRender, setUsersRender] = useState([])

	useEffect(() => {
		if (type === 'subs') {
			users.map((user) => {
				axios.get(`users/${user.author}`).then(res => {
					setUsersRender(prev => [...prev, res.data])
				})
			})
		}
		if (type === 'follows') {
			users.map((user) => {
				axios.get(`users/${user.follower}`).then(res => {
					setUsersRender(prev => [...prev, res.data])
				})
			})
		}
	}, [users])

	return (
		<div className={styles.root}>
			{usersRender.length ? (
				usersRender.map((user, i) => (
					<Link
						key={i}
						className={styles.linkSearch}
						to={`/profile/${user.id}`}
					>
						<UserInfo isSmall username={user.username} avatar={user.avatar} />
					</Link>
				))
			) : (
				<span>{typeMessage}</span>
			)}
		</div>
	)
}

export {ListUsers}
