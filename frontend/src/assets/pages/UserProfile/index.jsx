import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './UserProfile.module.scss'
import UserInfo from '../../components/UserInfo'
import Post from '../../components/Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faPlus } from '@fortawesome/free-solid-svg-icons'

import { fetchPosts, fetchUserPosts } from '../../../redux/slices/posts'

import { Link, Navigate, useParams } from 'react-router-dom'
import {
	fetchLogin,
	fetchOtherUser,
	selectIsAuth,
	selectIsAuthStatus,
} from '../../../redux/slices/auth'
import axios from '../../../axios'
import {
	fetchFollowers,
	fetchSubscribe,
	fetchSubscriptions,
} from '../../../redux/slices/socialGraph'
import ButtonSubs from '../../components/ButtonSubs/ButtonSubs'
import Skeleton from '../../components/Post/Skeleton'

function UserProfile() {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const posts = useSelector(state => state.posts.userPosts)
	const isUserDataLoaded = state => state.auth.data !== null
	const userData = useSelector(state =>
		isUserDataLoaded(state) ? state.auth.data : null
	)
	const otherUserData = useSelector(state => state.auth.user)
	const { subscriptions } = useSelector(state => state.social)

	const [followers, setFollowers] = useState([])
	const [isFollow, setIsFollow] = useState(false)

	const { id } = useParams()

	useEffect(() => {
		dispatch(fetchUserPosts(id))
		dispatch(fetchOtherUser(id))
		dispatch(fetchSubscriptions(id))

		try {
			if (userData) {
				const users = JSON.parse(localStorage.getItem('users')) || []
				if (users.find(item => item.avatar !== userData.user.avatar)) {
					const invalidObj = users.find(
						item => item.username === userData.user.username
					)
					const newUsers = users.splice(users.indexOf(invalidObj), 1)
					window.localStorage.setItem('users', JSON.stringify(newUsers))

					const obj = {
						id: invalidObj.id,
						username: userData.user.username,
						avatar: userData.user.avatar,
						refresh: invalidObj.refresh,
						accessff: invalidObj.accessff,
					}
					users.push(obj)
					window.localStorage.setItem('users', JSON.stringify(users))
				}

				axios.get(`my_followers/${id}/`).then(res => {
					setFollowers(res.data)
					if (
						res.data.some(item => item.follower === Number(userData.user.id))
					) {
						setIsFollow(true)
					}
				})
			}
		} catch (error) {
			console.log(error)
		}
	}, [id])

	const authStatus = useSelector(selectIsAuthStatus)

	const isPostsLoading = posts.status === 'loading'

	const handleSubscribe = async () => {
		try {
			const params = {
				author: Number(id),
				follower: Number(userData.user.id),
			}
			await axios.post('subscribe/', params)
			const { data } = await axios.get(`my_followers/${id}/`)
			setFollowers(data)
			if (data.some(item => item.follower === Number(userData.user.id))) {
				setIsFollow(true)
			} else {
				setIsFollow(false)
			}
		} catch (err) {
			console.warn(err)
			alert('Bad create comment')
		}
	}

	return (
		<div className={styles.profile}>
			{otherUserData && (
				<UserInfo
					avatar={otherUserData.avatar}
					username={otherUserData.username}
					fullname={`${otherUserData.first_name} ${otherUserData.last_name}`}
					followers={followers}
					subscriptions={subscriptions}
					isFollow={isFollow}
					handleSubscribe={handleSubscribe}
					posts={posts.items}
					isProfile
				/>
			)}
			{userData && Number(userData.user.id) === Number(id) ? (
				<>
					<Link to='/settings/edit-profile' className={styles.btnSettings}>
						Редактировать
					</Link>
					<div className={styles.iconsMobile}>
						<Link className={styles.add} to={'/post-add'}>
							<FontAwesomeIcon icon={faPlus} />
						</Link>
						<Link to='/settings' className={styles.settings}>
							<FontAwesomeIcon icon={faGear} />
						</Link>
					</div>
				</>
			) : (
				<ButtonSubs handleSubscribe={handleSubscribe} isFollow={isFollow} />
			)}

			<div className={styles.postWrapper}>
				<div className={styles.wrapper}>
					{isPostsLoading
						? [...Array(5)]
						: posts.items.map((obj, i) => (
								<Post
									key={i}
									images={obj.image}
									videos={obj.video}
									title={obj.title}
									id={obj.id}
									slug={obj.slug}
								/>
						  ))}
				</div>
			</div>
		</div>
	)
}

export default UserProfile
