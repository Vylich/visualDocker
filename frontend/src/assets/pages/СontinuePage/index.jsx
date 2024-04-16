import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './ContinuePage.module.scss'
import logo from '../../../img/logo/Logo.svg'
import {UserInfo} from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, selectIsAuth } from '../../../redux/slices/auth'
import { removePostsState } from '../../../redux/slices/posts'
import { jwtDecode } from 'jwt-decode'
import Error from '../../components/errorContinue/Error'

const ContinuePage = () => {
	const isAuth = useSelector(selectIsAuth)

	const [usersActive, setUsersActive] = useState([])
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [avatar, setAvatar] = useState(null)
	const [username, setUsername] = useState(null)

	const onSubmit = username => {
		const obj = usersActive.find(ob => ob.username === username)

		const refresh = obj.refresh
		if (refresh) {
			const decodedToken = jwtDecode(refresh)
			const currentTime = Math.floor(Date.now() / 1000)
			if (decodedToken.exp <= currentTime) {
				navigate('/login')
				alert(
					'Вас давно не было, пожалуйста, войдите при помощи логина и пароля'
				)
			} else {
				window.localStorage.setItem('accessff', obj.accessff)
				window.localStorage.setItem('refresh', obj.refresh)
				window.localStorage.setItem('avatar', obj.avatar)
				window.localStorage.setItem('username', obj.username)

				dispatch(fetchLogin())
				console.log(isAuth)
				dispatch(removePostsState())
				navigate('/home')
			}
		}
	}

	useEffect(() => {
		const arrUsers = window.localStorage.getItem('users') || null
		setUsersActive(JSON.parse(arrUsers))
		setAvatar(window.localStorage.getItem('avatar'))
		setUsername(window.localStorage.getItem('username'))
		if (!arrUsers) {
			return navigate('/login')
		}
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
