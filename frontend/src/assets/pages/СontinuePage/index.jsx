import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './ContinuePage.module.scss'
import logo from '../../../img/logo/Logo.svg'
import UserInfo from '../../components/UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, selectIsAuth } from '../../../redux/slices/auth'
import { removePostsState } from '../../../redux/slices/posts'

const ContinuePage = () => {
	const isAuth = useSelector(selectIsAuth)

	const [usersActive, setUsersActive] = useState([])
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [avatar, setAvatar] = useState(null)
	const [username, setUsername] = useState(null)

	const onSubmit = username => {
		const obj = usersActive.find(ob => ob.username === username)
		window.sessionStorage.setItem('accessff', obj.accessff)
		window.sessionStorage.setItem('refresh', obj.refresh)
		dispatch(fetchLogin())
		dispatch(removePostsState())
		navigate('/home')
	}

	useEffect(() => {
		const arrUsers = window.sessionStorage.getItem('users')
		setUsersActive(JSON.parse(arrUsers))
		if (!usersActive.length) {
			return navigate('/login')
		}
		setAvatar(window.sessionStorage.getItem('avatar'))
		setUsername(window.sessionStorage.getItem('username'))
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.container__block}>
				<header className={styles.container__header}>
					<img src={logo} width={70} alt='Логотип' />
					<h2>Продолжить как</h2>
				</header>
				<div className={styles.usersWrap}>
					{usersActive &&
						usersActive.map((item, i) => (
							<button
								key={i}
								className={styles.link}
								onClick={() => onSubmit(item.username)}
							>
								<UserInfo
									isContinue
									avatar={item.avatar !== 'null' ? item.avatar : null}
									username={item.username}
								/>
							</button>
						))}
				</div>
			</div>
			<div className={styles.container__block}>
				<div className={styles.container__register}>
					<p>Или</p>
					<Link to='/login'>Войти</Link>
					<p>в другой аккаунт</p>
				</div>
			</div>
		</div>
	)
}

export default ContinuePage
