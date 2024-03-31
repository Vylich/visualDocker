import { useState, useEffect, useRef } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import logo from '../../../img/logo/Logo.svg'
import avatar from '../../../img/avatar-default.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBell,
	faMessage,
	faChevronDown,
	faMagnifyingGlass,
	faXmark,
	faHouse,
	faSquarePlus,
} from '@fortawesome/free-solid-svg-icons'
import { isAction } from '@reduxjs/toolkit'
import Settings from '../Settings'
import Messages from '../Messages'
import Notifications from '../Notifications'
import Search from '../Search'
import { useDispatch, useSelector } from 'react-redux'

import Card from '../SearchigCard'
import { fetchLogin, selectIsAuth } from '../../../redux/slices/auth'
import useOnclickOutside from 'react-cool-onclickoutside'
import WebSocketComponent from '../notifications'
import Notif from '../Notif/Notif'
import axios from '../../../axios'
import { addSearch } from '../../../redux/slices/search'

function Header() {
	const [searchedText, setSearchedText] = useState('')
	const [itemsSearch, setItemsSearch] = useState([])
	const [settingsOpened, setSettingsOpened] = useState(false)
	const [messagesOpened, setMessagesOpened] = useState(false)
	const [notificationsOpened, setNotificationsOpened] = useState(false)
	const [searchOpened, setSearchOpened] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [isNavVisible, setIsNavVisible] = useState(true)
	const isAuth = useSelector(selectIsAuth)
	const isUserDataLoaded = state => state.auth.data !== null
	const userdata = useSelector(state =>
		isUserDataLoaded(state) ? state.auth.data.user : null
	)
	const unreadCount = useSelector(state => state.notif.unreadCount)
	const unreadNotifCount = useSelector(state => state.notif.notificationsCount)

	const [foundItems, setFoundItems] = useState(null)

	const refs = [
		useOnclickOutside(() => setNotificationsOpened(false)),
		useOnclickOutside(() => setMessagesOpened(false)),
		useOnclickOutside(() => setSettingsOpened(false)),
	]

	const { posts } = useSelector(state => state.posts)
	const isPostsLoading = posts.status === 'loading'
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const hideNavOnClick = () => {
		if (window.innerWidth < 1024) {
			setIsNavVisible(false)
		}
		setIsNavVisible(true)
	}

	useEffect(() => {
		dispatch(fetchLogin())
	}, [])

	const handleSettings = () => {
		setSettingsOpened(!settingsOpened)
	}

	const handleMessages = () => {
		setMessagesOpened(!messagesOpened)
	}

	const handleNotifications = () => {
		setNotificationsOpened(!notificationsOpened)
	}

	const handleSearch = () => {
		setSearchOpened(true)
		hideNavOnClick()
	}

	const onClickSearch = obj => {
		setSearchedText(obj)
	}

	const onSubmit = e => {
		e.preventDefault()
		const filteredItems = itemsSearch.filter(str => str.trim() !== '')
		setItemsSearch([...filteredItems, searchedText])
		setSearchOpened(false)
		if (searchedText !== '') {
			navigate(`/search/${searchedText}`)
		}
	}

	const onDelete = obj => {
		const filteredItems = itemsSearch.filter(item => item !== obj.obj)
		setItemsSearch(filteredItems)
		sessionStorage.removeItem('searchedItems')
	}

	useEffect(() => {
		const storageSearchedItems = JSON.parse(
			sessionStorage.getItem('searchedItems')
		)
		if (storageSearchedItems) {
			setItemsSearch(storageSearchedItems)
		}
	}, [])

	useEffect(() => {
		sessionStorage.setItem('searchedItems', JSON.stringify(itemsSearch))
	}, [itemsSearch])

	const renderItems = () => {
		const filtredItems = posts.items.filter(item =>
			item.name.toLowerCase().includes(searchedText.toLowerCase())
		)
		return (isPostsLoading ? [...Array(6)] : filtredItems).map(
			(item, index) => (
				<Card
					key={index}
					onClickSearch={onClickSearch}
					title={item.name}
					images={item.image}
				/>
			)
		)
	}

	useEffect(() => {
		if (searchedText) {
			axios.get(`/search/?search=${searchedText}`).then(res => {
				setFoundItems(res.data)
				dispatch(addSearch(res.data.post_tag))
			})
		}
	}, [searchedText])

	return (
		<div className={styles.root}>
			{searchOpened && (
				<div
					className={styles.overlay}
					onClick={() => {
						setSearchOpened(false)
						// setSearchedText('')
						setFoundItems(null)
					}}
				></div>
			)}
			<header className={styles.header}>
				<nav className={styles.nav}>
					<Link className={styles.logo} to={'/'}>
						<img src={logo} width={40} alt='Логотип' />
					</Link>
					<NavLink
						className={({ isActive }) =>
							isActive ? `${styles.link} ${styles.isActive}` : styles.link
						}
						to={'/'}
					>
						<span className={styles.iconMobile}>
							<FontAwesomeIcon icon={faHouse} />
						</span>
						<span>Главная</span>
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive
								? `${styles.link} ${styles.isActive} ${styles.linkMobile}`
								: `${styles.link} ${styles.linkMobile}`
						}
						to={'/search'}
					>
						<span className={styles.iconMobile}>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</span>
						<span>Поиск</span>
					</NavLink>
					{userdata && (
						<>
							<NavLink
								className={({ isActive }) =>
									isActive
										? `${styles.link} ${styles.isActive}`
										: `${styles.link} ${styles.create}`
								}
								to={'/post-add'}
							>
								<span className={styles.iconMobile}>
									<FontAwesomeIcon icon={faSquarePlus} />
								</span>
								<span>Создать</span>
							</NavLink>
							<NavLink
								className={({ isActive }) =>
									isActive
										? `${styles.link} ${styles.isActive} ${styles.linkMobile}`
										: `${styles.link} ${styles.linkMobile}`
								}
								to={'/notification/notices'}
							>
								<span className={styles.iconMobile}>
									<FontAwesomeIcon icon={faMessage} />
								</span>
								<span>Входящие</span>
								{<Notif unreadCount={unreadCount + unreadNotifCount} />}
							</NavLink>
							<NavLink
								className={({ isActive }) =>
									isActive
										? `${styles.link} ${styles.isActive} ${styles.linkMobile}`
										: `${styles.link} ${styles.linkMobile}`
								}
								to={userdata ? `/profile/${userdata.id}` : ''}
							>
								<img
									className={styles.ava}
									src={
										userdata && userdata.avatar
											? `http://${window.location.hostname}:8000${userdata.avatar}`
											: avatar
									}
									width={20}
									alt='Аватар'
								/>
								<span>Профиль</span>
							</NavLink>
						</>
					)}
					<div className={styles.input}>
						<FontAwesomeIcon
							className={styles.iconSearch}
							icon={faMagnifyingGlass}
						/>
						<form onSubmit={e => onSubmit(e)}>
							<input
								type='text'
								name='search'
								autoComplete='off'
								onClick={e => handleSearch(e)}
								placeholder='Найти'
								value={searchedText}
								onChange={e => setSearchedText(e.target.value)}
							/>
						</form>

						{searchOpened && (
							<>
								<Search
									onClickSearch={onClickSearch}
									items={itemsSearch}
									onDelete={onDelete}
									isNavVisible={isNavVisible}
									searchedItems={renderItems}
									foundItems={foundItems}
									searchedText={searchedText}
									setSearchedText={setSearchedText}
									onSubmit={onSubmit}
								/>
								<button
									className={styles.clearBtn}
									onClick={() => {
										setSearchedText('')
										setFoundItems(null)
									}}
								>
									<FontAwesomeIcon icon={faXmark} />
								</button>
							</>
						)}
					</div>
					{userdata ? (
						<div className={styles.groupIcons}>
							<button ref={refs[0]} onClick={handleNotifications}>
								<FontAwesomeIcon
									className={styles.iconNotification}
									icon={faBell}
								/>
								{<Notif unreadCount={unreadNotifCount} />}
							</button>
							<button ref={refs[1]} onClick={handleMessages}>
								<FontAwesomeIcon
									className={styles.iconMessage}
									icon={faMessage}
								/>
								{<Notif unreadCount={unreadCount} />}
							</button>

							<Link to={`/profile/${userdata.id}`}>
								<img
									className={styles.ava}
									src={
										userdata.avatar
											? `http://${window.location.hostname}:8000${userdata.avatar}`
											: avatar
									}
									width={40}
									alt='Аватар'
								/>
							</Link>

							<button
								ref={refs[2]}
								onClick={handleSettings}
								className={styles.settings}
							>
								<FontAwesomeIcon icon={faChevronDown} />
							</button>
						</div>
					) : (
						<Link className={`${styles.link} ${styles.isActive}`} to={'/login'}>
							Войти
						</Link>
					)}
					{settingsOpened && (
						<div className={styles.wrapMenu} ref={refs[2]}>
							<Settings user={userdata} handleSettings={handleSettings} />
						</div>
					)}
					{messagesOpened && (
						<div ref={refs[1]} className={styles.wrapMenu}>
							<Messages id={userdata.id} />
						</div>
					)}
					{notificationsOpened && (
						<div ref={refs[0]} className={styles.wrapMenu}>
							<Notifications />
						</div>
					)}
				</nav>
			</header>
		</div>
	)
}

export default Header
