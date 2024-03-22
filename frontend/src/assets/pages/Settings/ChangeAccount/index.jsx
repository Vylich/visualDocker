import React, { useEffect, useState } from 'react'
import styles from './ChangeAccount.module.scss'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import UserInfo from '../../../components/UserInfo'
import { fetchLogin } from '../../../../redux/slices/auth'

const ChangeAccount = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [usersActive, setUsersActive] = useState([])

	const onSubmit = username => {
		const obj = usersActive.find(ob => ob.username === username)
		window.localStorage.setItem('access', obj.access)
		window.localStorage.setItem('refresh', obj.refresh)
		dispatch(fetchLogin())
		navigate('/home')
	}

	useEffect(() => {
		const arrUsers = window.localStorage.getItem('users')
		setUsersActive(JSON.parse(arrUsers))
	}, [])

	return (
		<div className={styles.root}>
				<div className={styles.block}>
				<span>Сейчас:</span>
				{user && (
					<Link to={`/profile/${user.id}`}>
						<UserInfo
							username={user.username}
							// fullname={user.first_name}
							avatar={user.avatar ? user.avatar : null}
							email={user.email}
							userId={user.id}
							isSmall
						/>
					</Link>
				)}
			</div>
			<div className={styles.block}>
				<span>Ваши аккаунты</span>
				{user && (
					<>
						{usersActive &&
							usersActive.map((item, i) => (
								<button
									key={i}
									className={styles.link}
									onClick={() => onSubmit(item.username)}
									style={{ display: item.username === user.username && 'none' }}
								>
									<UserInfo
										isSmall
										avatar={item.avatar !== 'null' ? item.avatar : null}
										username={item.username}
									/>
								</button>
							))}
					</>
				)}

				<Link to='/login'>Добавить аккаунт</Link>
			</div>
		</div>
	)
}

export default ChangeAccount