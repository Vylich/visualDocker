import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Messages.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronLeft,
	faMagnifyingGlass,
	faPaperPlane,
	faPenToSquare,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons'

import axios, { normalAccess } from '../../../axios'
import {UserInfo, UserMessage} from '@components'
import { useNavigate } from 'react-router-dom'


// import { removeReadMessage } from '../../../redux/slices/notification'

const Messages = ({ id }) => {
	const [isMessaging, setIsMessaging] = useState(false)
	const [isStartChat, setIsStartChat] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	// const [socket, setSocket] = useState(null)
	const [messagesState, setMessages] = useState([])
	const [history, setHistory] = useState([])
	const [message, setMessage] = useState('')
	const [idRoom, setIdRoom] = useState('')
	const [users, setUsers] = useState([])
	const [interlocutors, setInterlocutors] = useState({
		me: 'none',
		interlocutor: 'none',
	})
	const isStartMessage = useSelector(state => state.notif.startChat)
	const [userTalker, setUserTalker ] =useState({})
	const notifUserMess = useSelector(state => state.notif.unreadCount)
	const [talkers, setTalkers] = useState([])
	const [idReceiver, setIdReceiver] = useState('')
	// const notif = useSelector(state => state.notif.unreadMessages)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const socketRef = useRef()

	const filterTalkers = arrConvers => {
		for (let i = 0; i < arrConvers.length; i++) {
			if (arrConvers[i].initiator.id !== id) {
				const obj = {
					user: arrConvers[i].initiator,
					lastMessage: arrConvers[i].last_message,
				}
				setTalkers(prev => [...prev, obj])
			} else if (arrConvers[i].receiver.id !== id) {
				const obj = {
					user: arrConvers[i].receiver,
					lastMessage: arrConvers[i].last_message,
				}
				setTalkers(prev => [...prev, obj])
			}
		}
	}

	useEffect(() => {
		if (id) {
			axios.get('conversations/').then(res => {
				setTalkers([])
				filterTalkers(res.data)
			})
		}
	}, [id, notifUserMess])

	useEffect(() => {
		if (idRoom) {
			socketRef.current = new WebSocket(
				`wss://visualapp.ru/ws/chat/${idRoom}/?token=${
					window.localStorage.getItem('accessff')
				}`
			)

			socketRef.current.addEventListener('open', event => {
				const objRead = {
					type: 'read_message',
					receiver: idReceiver,
				}
				socketRef.current.send(JSON.stringify(objRead))
			})
			socketRef.current.addEventListener('message', event => {
				const data = delDuplicate(JSON.parse(event.data))
				setHistory(prev => [data, ...prev])
			})

			return () => {
				socketRef.current.close()
			}
		}
	}, [idRoom])

	// useEffect(() => {
	// 	axios.get('users/').then(res => {
	// 		const usersItems = res.data.filter(user => user.id !== id)
	// 		setUsers(usersItems)
	// 	})
	// }, [])

	useEffect(() => {
		if (searchValue) {
			axios.get(`/search/?search=${searchValue}`).then(res => {
				const usersItems = res.data.user.filter(user => user.id !== id)
				setUsers(usersItems)
			})
		}
	}, [searchValue])

	const sendMessage = e => {
		e.preventDefault()
		const obj = {
			type: 'chat_message',
			receiver: idReceiver,
			message: message,
		}
		socketRef.current.send(JSON.stringify(obj))
		setMessage('')
	}

	const delDuplicate = messages => {
		const result = messages
		for (let i = 0; i < result.length; i++) {
			for (let j = i + 1; j < result.length; j++) {
				const date1 = new Date(result[i].timestamp)
				const date2 = new Date(result[j].timestamp)
				const milliseconds1 = date1.getTime()
				const milliseconds2 = date2.getTime()
				if (
					milliseconds1 - milliseconds2 < 500 &&
					result[i].text === result[j].text &&
					result[i].sender === result[j].sender
				) {
					result.splice(i, 1)
				}
				if (result[i].text === '') {
					result.splice(i, 1)
				}
			}
		}
		return result
	}

	const startChat = async username => {
		const obj = {
			username: username,
		}
		setIsStartChat(true)
		setIsMessaging(false)

		await axios.post('conversations/start/', obj).then(res => {
			const obj = {
				me: 'none',
				interlocutor: 'none',
			}
			if (res.data.initiator.id === id) {
				obj.me = res.data.initiator.username
				obj.interlocutor = res.data.receiver.username
				setInterlocutors(obj)
			} else {
				obj.interlocutor = res.data.initiator.username
				obj.me = res.data.receiver.username
				setInterlocutors(obj)
			}
			setIdRoom(res.data.id)
			setHistory(delDuplicate(res.data.message_set))
		})
	}

	const handleClick = () => {
		setIsStartChat(false)
		setIdRoom(null)
		socketRef.current.close()
	}

	const goUser = () => {
		navigate(`/profile/${userTalker.id}`)
	}

	useEffect(() => {
		if(isStartMessage !== '') {
			startChat(isStartMessage.username)
			setIdReceiver(isStartMessage.id)
			setUserTalker(isStartMessage)
		}
	}, [isStartMessage])


	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				{!isMessaging && !isStartChat && (
					<>
						<h3 className={styles.title}>Входящие</h3>
						<div className={styles.input}>
							<FontAwesomeIcon
								className={styles.iconSearch}
								icon={faMagnifyingGlass}
							/>
							<input
								type='text'
								onClick={() => {
									setIsMessaging(true)
								}}
								name='search'
								placeholder='Поиск по имени или эл. адресу'
							/>
						</div>
						<button
							className={styles.newMessage}
							onClick={() => setIsMessaging(true)}
						>
							<span>
								<FontAwesomeIcon icon={faPenToSquare} />
							</span>
							<span>Новое сообщение</span>
						</button>
						<div className={styles.talkers}>
							{!!talkers &&
								talkers.map((talker, i) => (
									<div
										className={styles.talker}
										onClick={() => {
											setIdReceiver(talker.user.id)
											startChat(talker.user.username)
											setUserTalker(talker.user)
										}}
										key={i}
									>
										<UserMessage
											username={talker.user.username}
											avatar={talker.user.avatar}
											text={
												talker.lastMessage.sender === id
													? `Вы: ${talker.lastMessage.text}`
													: talker.lastMessage.text
											}
											isUnread={String(talker.lastMessage.read) === 'false'}
										/>
										{/* <span>{String(talker.lastMessage.read)}</span> */}
									</div>
								))}
						</div>
						<button className={styles.newFriends}>
							<span>
								<FontAwesomeIcon icon={faUserPlus} />
							</span>
							<span>Пригласите друзей</span>
						</button>
					</>
				)}
				{isMessaging && !isStartChat && (
					<>
						<div className={styles.titleWrapper}>
							<h3 className={styles.titleMessage}>Новое сообщение</h3>{' '}
							<button onClick={() => setIsMessaging(false)}>Отмена</button>
						</div>
						<div className={styles.input}>
							<FontAwesomeIcon
								className={styles.iconSearch}
								icon={faMagnifyingGlass}
							/>
							<input
								type='text'
								onClick={() => setIsMessaging(true)}
								name='search'
								autoFocus
								value={searchValue}
								onChange={e => setSearchValue(e.target.value)}
								placeholder='Поиск по имени или эл. адресу'
							/>
						</div>
						<div className={styles.usersList}>
							{!!users &&
								users.map((user, i) => (
									<button
										key={i}
										className={styles.linkUser}
										onClick={() => {
											setSearchValue(user.username)
											startChat(user.username)
											setIdReceiver(user.id)
										}}
									>
										<UserInfo
											isSmall
											username={user.username}
											avatar={user.avatar}
										/>
									</button>
								))}
						</div>
					</>
				)}
				{isStartChat && !isMessaging && (
					<>
						<div className={styles.header}>
							<span onClick={handleClick} className={styles.backBtn}>
								<FontAwesomeIcon icon={faChevronLeft} />
							</span>
							<h3 onClick={goUser} className={styles.userTalker}>{userTalker.username}</h3>
						</div>
						<div className={styles.messages}>
							{!!history &&
								history.map((message, index) => (
									<div
										key={index}
										className={
											message.sender === id
												? styles.myMessage
												: styles.userMessage
										}
									>
										<span className={styles.textMess}>{message.text}</span>
										<span className={styles.sender}>
											{message.sender === id
												? interlocutors.me
												: interlocutors.interlocutor}
										</span>
									</div>
								))}
						</div>

						<form className={styles.footer} onSubmit={sendMessage}>
							<div className={styles.input}>
								<input
									type='text'
									value={message}
									required
									placeholder='Введите сообщение'
									onChange={e => setMessage(e.target.value)}
								/>
							</div>
							<button disabled={!message} type='submit'>
								<FontAwesomeIcon icon={faPaperPlane} />
							</button>
						</form>
					</>
				)}
			</div>
		</div>
	)
}

export {Messages}
