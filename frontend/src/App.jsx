import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
	fetchLogin,
	fetchRefresh,
	selectIsAuth,
	selectIsAuthStatus,
} from './redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'

import {Header, Search, WebSocketComponent, ThemeMode} from '@components'
import './index.scss'

import { Login, Registration, Home, UserProfile, FullPost, SettingsProfile, AddPost, EditProfile, ManageAccount, Security, NotificationSettings, VisibilityProfile, Confidentiality, Notification, ContinuePage, ChangeAccount, SearchPage, Subs, SuccessfulPage, ErrorPage } from '@pages'

import { useNavigate } from 'react-router-dom'


function App() {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const authStatus = useSelector(selectIsAuthStatus)
	const myId = useSelector(state => state.auth)
	const navigate = useNavigate()
	// const socketRef = useRef()
	// const [notificationMess, setNotificationMess] = useState([])

	// useEffect(() => {
	// 	if (window.localStorage.getItem('access')) {
	// 		socketRef.current = new WebSocket(
	// 			`${
	// 				import.meta.env.VITE_APP_WS_URL
	// 			}/ws/notifications/?token=${window.localStorage.getItem('access')}`
	// 		)

	// 		socketRef.current.addEventListener('message', event => {
	// 			const data = JSON.parse(event.data)
	// 			setNotificationMess(prev => [data, ...prev])
	// 		})
	// 	}
	// }, [])

	useEffect(() => {
		dispatch(fetchLogin()).then(res => {
			if (!res.payload ) {
				navigate('/continue')
			}
		})
	}, [])

	return (
		<>
			<div className='wrapper'>
				<WebSocketComponent />
				<Header />
				<ThemeMode />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/continue' element={<ContinuePage />} />
					<Route path='/login/reg' element={<Registration />} />
					<Route path='/profile/:id' element={<UserProfile myId={myId} />} />
					<Route path='/posts/:id' element={<FullPost />} />
					<Route path='/post-add' element={<AddPost />} />
					<Route path='/posts/:id/edit' element={<AddPost />} />
					<Route path='/settings' element={<SettingsProfile />}>
						<Route path='edit-profile' element={<EditProfile />} />
						<Route path='manage-account' element={<ManageAccount />} />
						<Route path='profile-visibility' element={<VisibilityProfile />} />
						<Route path='notification/*' element={<NotificationSettings />} />
						<Route path='security' element={<Security />} />
						<Route path='confidentiality' element={<Confidentiality />} />
						<Route path='terms-of-service' element={<Confidentiality />} />
						<Route path='privacy-policy' element={<Confidentiality />} />
						<Route path='change-account' element={<ChangeAccount />} />
					</Route>
					<Route path='/search' element={<Search />} />
					<Route path='/search/:id' element={<SearchPage />} />
					<Route path='/notification' element={<Notification />}>
						<Route path='notices' element={<Confidentiality />} />
						<Route path='messages' element={<Confidentiality />} />
					</Route>
					<Route path='/subs' element={<Subs />} />
					<Route path='/subs/successful' element={<SuccessfulPage />} />
					<Route path='/error' element={<ErrorPage />} />
				</Routes>
			</div>
		</>
	)
}

export default App
