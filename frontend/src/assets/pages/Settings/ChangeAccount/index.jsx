import React, { useEffect, useState } from 'react'
import styles from './ChangeAccount.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import UserInfo from '../../../components/UserInfo'
import { fetchLogin } from '../../../../redux/slices/auth'

const ChangeAccount = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [usersActive, setUsersActive] = useState([])
	const isUserDataLoaded = state => state.auth.data !== null
	const userData = useSelector(state =>
		isUserDataLoaded(state) ? state.auth.data.user : null
	)

	useEffect(() => {
		dispatch(fetchLogin())
	}, [])

	const onSubmit = username => {
		const obj = usersActive.find(ob => ob.username === username)
		window.sessionStorage.setItem('accessff', obj.accessff)
		window.sessionStorage.setItem('refresh', obj.refresh)
		dispatch(fetchLogin())
		navigate('/home')
	}

	useEffect(() => {
		const arrUsers = window.sessionStorage.getItem('users')
		setUsersActive(JSON.parse(arrUsers))
	}, [])

	return (
		<div className={styles.root}>
			<div className={styles.block}>
				<span>Сейчас:</span>
				{userData && (
					<Link to={`/profile/${userData.id}`}>
						<UserInfo
							username={userData.username}
							avatar={userData.avatar ? userData.avatar : null}
							email={userData.email}
							userId={userData.id}
							isSmall
						/>
					</Link>
				)}
			</div>
			<div className={styles.block}>
				<span>Ваши аккаунты</span>
				{userData && (
					<>
						{usersActive &&
							usersActive.map((item, i) => (
								<button
									key={i}
									className={styles.link}
									onClick={() => onSubmit(item.username)}
									style={{
										display: item.username === userData.username && 'none',
									}}
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
