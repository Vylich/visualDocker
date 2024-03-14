import styles from './Settings.module.scss'
import UserInfo from '../UserInfo'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchLogin, logout } from '../../../redux/slices/auth'
import avatarDefault from '../../../img/avatar-default.svg'
import { useEffect, useState } from 'react'

const Settings = ({ user, handleSettings }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [usersActive, setUsersActive] = useState([])

	const onClickLogout = () => {
		if (window.confirm('Are you sure you want to log out?')) {
			dispatch(logout())
			navigate('/login')
			window.localStorage.removeItem('access')
			window.localStorage.removeItem('refresh')
			window.localStorage.removeItem('username')
			window.localStorage.removeItem('avatar')
			const users = JSON.parse(localStorage.getItem('users')) || []
			const invalidObj = users.find(item => item.username === user.username)
			const newUsers = users.filter(item => item.username !== user.username)
			console.log(invalidObj)
			if (newUsers.length) {
				window.localStorage.setItem('users', JSON.stringify(newUsers))
			} else {
				window.localStorage.removeItem('users')
			}
			handleSettings()
		}
	}

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
			<div className={styles.block}>
				<span>Дополнительно</span>
				<Link to='/settings/manage-account'>Настройки</Link>
				<Link to='/terms-of-service'>Условия предоставления услуг</Link>
				<Link to='/privacy-policy'>Политика конфиденциальности</Link>
				<button className={styles.logout} onClick={onClickLogout}>
					Выход
				</button>
			</div>
		</div>
	)
}

export default Settings
