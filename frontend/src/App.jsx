import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
	fetchLogin,
	fetchRefresh,
	selectIsAuth,
	selectIsAuthStatus,
} from './redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from './assets/pages/Login'
import { Registration } from './assets/pages/Registration'
import Home from './assets/pages/Home'
import UserProfile from './assets/pages/UserProfile'
import FullPost from './assets/pages/FullPost'
import SettingsProfile from './assets/pages/Settings/SettingsProfile'
import Header from './assets/components/Header'
import './index.scss'
import AddPost from './assets/pages/AddPost'
import EditProfile from './assets/pages/Settings/EditProfile'
import ManageAccount from './assets/pages/Settings/ManageAccount'
import Security from './assets/pages/Settings/Security'
import NotificationSettings from './assets/pages/Settings/NotificationSettings'
import VisibilityProfile from './assets/pages/Settings/VisibilityProfile'
import Confidentiality from './assets/pages/Settings/Confidentiality'
import Search from './assets/components/Search'
import Notification from './assets/pages/Notification'
import ContinuePage from './assets/pages/СontinuePage'
import WebSocketComponent from './assets/components/notifications.jsx'
import ChangeAccount from './assets/pages/Settings/ChangeAccount/index.jsx'
import SearchPage from './assets/pages/SearchPage/index.jsx'
import Subs from './assets/pages/Subs/index.jsx'
import SuccessfulPage from './assets/pages/Subs/SuccessfulPage.jsx'
import { useNavigate } from 'react-router-dom'
import ErrorPage from './assets/pages/ErrorPage/index.jsx'

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
			if (!res.payload) {
				navigate('/continue')
			}
		})
	}, [])

	return (
		<>
			<div className='wrapper'>
				<WebSocketComponent />
				<Header />
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
