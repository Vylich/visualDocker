import React, { useEffect } from 'react'
import styles from './SettingsProfile.module.scss'
import NavSettings from '../NavSettings'
import {
	Routes,
	Route,
	Link,
	useLocation,
	Navigate,
	useNavigate,
} from 'react-router-dom'
import EditProfile from '../EditProfile'
import ManageAccount from '../ManageAccount'
import VisibilityProfile from '../VisibilityProfile'
import NotificationSettings from '../NotificationSettings'
import Security from '../Security'
import Confidentiality from '../Confidentiality'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../../axios'
import { fetchLogin } from '../../../../redux/slices/auth'
import ChangeAccount from '../ChangeAccount'

const SettingsProfile = () => {
	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const [isShow, setIsShow] = useState(false)
	const [isNavVisible, setIsNavVisible] = useState(true)
	const [isNavVisibleOnClick, setIsNavVisibleOnClick] = useState(true)
	const [width, setWidth] = useState(window.innerWidth)
	const navigate = useNavigate()

	const [imageUrl, setImageUrl] = useState('')
	const [image, setImage] = useState(null)
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [username, setUsername] = useState('')
	const [idUser, setIdUser] = useState('')

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [birthday, setBirthday] = useState('')
	const [gender, setGender] = useState('')

	const onSubmit = () => {
		const formData = new FormData()
		if (image) {
			formData.append('avatar', image)
		}
		if (name) {
			formData.append('first_name', name)
		}
		if (surname) {
			formData.append('last_name', surname)
		}
		if (username) {
			formData.append('username', username)
		}
		if (password) {
			formData.append('password', password)
		}
		if (email) {
			formData.append('email', email)
		}
		if (birthday) {
			formData.append('birthday', birthday)
		}
		if (gender) {
			formData.append('gender', gender)
		}
		axios.patch(`me/${idUser}/`, formData)
		dispatch(fetchLogin())
	}

	//	const onSubmits = async () => {
	//	try {
	//	setLoading(true);
	//const formData = new FormData();
	//const arrTags = tags.split(",").map((tag) => tag.trim());
	//		formData.append("image", image);
	//	formData.append("name", title);
	//	arrTags.forEach((Tag) => {
	//		formData.append("tags", Tag);
	//	});
	//	formData.append("text", text);
	//	formData.append("author", userdata.username);
	//	const { data } = isEditing
	//		? await axios.patch(`/posts/${id}/`, formData)
	//		: await axios.post("/posts/", formData);
	//
	//		navigate(`/posts/${data.slug}`);
	//	} catch (err) {
	//		console.warn(err);
	//		alert("Не удалось создать пост");
	//	}
	//	};
	const onReset = () => {
		dispatch(fetchLogin())
	}

	const hideNavOnClick = () => {
		if (width < 1024) {
			setIsNavVisibleOnClick(false)
		}
		if (width > 1024) {
			setIsNavVisibleOnClick(true)
		}
	}

	React.useEffect(() => {
		if (width < 1024) {
			setIsNavVisible(true)
			navigate('/settings')
		}
		if (width > 1024) {
			setIsNavVisible(false)
			setIsNavVisibleOnClick(true)
		}
	}, [width])

	React.useEffect(() => {
		const handleResize = event => {
			setWidth(event.target.innerWidth)
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useEffect(() => {
		switch (pathname) {
			case '/settings':
				setIsShow(true)
				break
			case '/settings/edit-profile':
				setIsShow(false)
				break
			case '/settings/manage-account':
				setIsShow(false)
				break
			case '/settings/profile-visibility':
				setIsShow(false)
				break
			case '/settings/change-account':
				setIsShow(true)
				break
		}
	}, [pathname])

	return (
		<div className={styles.wrapper}>
			<header className={styles.titleWrapper}>
				<Link
					className={
						isNavVisibleOnClick
							? styles.notVisible
							: `${styles.visible} ${styles.backBtn}`
					}
					onClick={() => setIsNavVisibleOnClick(true)}
					to='/settings'
				>
					<FontAwesomeIcon icon={faLeftLong} />
				</Link>
				<h2>Настройки</h2>
			</header>
			<div className={styles.root}>
				<NavSettings
					isNavVisible={isNavVisible}
					hideNavOnClick={hideNavOnClick}
					isNavVisibleOnClick={isNavVisibleOnClick}
				/>
				<Routes>
					<Route
						path='edit-profile'
						element={
							<EditProfile
								imageUrl={imageUrl}
								setImageUrl={setImageUrl}
								name={name}
								setName={setName}
								surname={surname}
								setSurname={setSurname}
								username={username}
								setUsername={setUsername}
								idUser={idUser}
								setIdUser={setIdUser}
								image={image}
								setImage={setImage}
							/>
						}
					/>
					<Route
						path='manage-account'
						element={
							<ManageAccount
								password={password}
								setPassword={setPassword}
								email={email}
								setEmail={setEmail}
								gender={gender}
								setGender={setGender}
								birthday={birthday}
								setBirthday={setBirthday}
								setIdUser={setIdUser}
							/>
						}
					/>
					<Route path='profile-visibility' element={<VisibilityProfile />} />
					<Route path='notification' element={<NotificationSettings />} />
					<Route path='terms-of-service' element={<Confidentiality />} />
					<Route path='privacy-policy' element={<Confidentiality />} />
					<Route path='change-account' element={<ChangeAccount />} />
				</Routes>
			</div>
			<div
				className={
					isShow
						? styles.notVisible
						: `${styles.visible} ${styles.buttonsWrapper}`
				}
			>
				<button onClick={onReset}>Сбросить</button>
				<button onClick={onSubmit}>Сохранить</button>
			</div>
		</div>
	)
}

export default SettingsProfile
