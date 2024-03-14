import React, { useEffect, useRef } from 'react'
import styles from './Messages.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronLeft,
	faMagnifyingGlass,
	faPaperPlane,
	faPenToSquare,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import axios from '../../../axios'
import UserInfo from '../UserInfo'
import UserMessage from '../UserInfo/UserMessage';

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
	const [talkers, setTalkers] = useState([])
	const socketRef = useRef()

	const filterTalkers = (arrConvers) => {
		for(let i = 0; i < arrConvers.length; i++) {
			console.log(arrConvers[i])
			if(arrConvers[i].initiator.id !== id) {
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
		axios.get('conversations/').then(res => {
			console.log(res.data)
			filterTalkers(res.data)
		})
	}, [])

	useEffect(() => {

		if (idRoom) {
			socketRef.current = new WebSocket(
				`ws://127.0.0.1:8000/ws/chat/${idRoom}/?token=${window.localStorage.getItem(
					'access'
				)}`
			)

			socketRef.current.addEventListener('message', event => {
				const data = delDuplicate(JSON.parse(event.data))
				setHistory(prev => [data, ...prev])
			})

			return () => {
				socketRef.current.close()
			}
		}
	}, [idRoom])

	useEffect(() => {
		axios.get('users/').then(res => {
			const usersItems = res.data.filter(user => user.id !== id)
			setUsers(usersItems)
		})
	}, [])

	const sendMessage = e => {
		e.preventDefault()
		socketRef.current.send(JSON.stringify({ message }))
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
		console.log(result)
		return result
	}

	const startChat = async username => {
		const obj = {
			username: username,
		}

		await axios.post('conversations/start/', obj).then(res => {
			console.log(delDuplicate(res.data.message_set))
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

			setIsStartChat(true)
			setIsMessaging(false)
		})
	}

	const sendFirstMessage = () => {
		startChat(searchValue)

		socketRef.current.send(JSON.stringify({ message }))
		setMessage('')
	}

	const handleClick = () => {
		setIsStartChat(false)
	}

	// const startChat2 = () => {
	// 	const obj = {
	// 		username: 'Vylich',
	// 	}

	// 	axios.post('conversations/start/', obj).then(res => {
	// 		console.log(res.data)
	// 		setIdRoom(res.data.id)

	// 	})

	// }

	const send = () => {
		axios.get(`conversations/${idRoom}/`).then(res => {
			console.log(res.data)
		})
	}

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
								onClick={() => setIsMessaging(true)}
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
									<div className={styles.talker} onClick={() => {
										setSearchValue(talker.user.username)
										startChat(talker.user.username)
									}} key={i}>
										<UserMessage
										username={talker.user.username}
										avatar={talker.user.avatar}
										text={talker.lastMessage.sender === id ? `Вы: ${talker.lastMessage.text}` : talker.lastMessage.text}
									/>
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
							<h3>{searchValue}</h3>
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

export default Messages
