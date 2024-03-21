import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectIsAuthStatus } from '../../../redux/slices/auth'
import { fetchLogin } from '../../../redux/slices/auth'
import { Navigate } from 'react-router-dom'
import { fetchPosts } from '../../../redux/slices/posts'
import { Link } from 'react-router-dom'
import Post from '../../components/Post'
import styles from './Home.module.scss'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import axios from '../../../axios.js'
import Loading from '../../components/Loading/Loading.jsx'

const Columns = ({ posts, loading }) => {
	const [width, setWidth] = useState(window.innerWidth)
	const [widthColumn, setWidthColumn] = useState(260)
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (width < 768) {
			setWidthColumn(width * 0.4775)
		}
		if (width < 1024 && width > 768) {
			setWidthColumn(width * 0.30788530466)
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

	const [countCols, setCountCols] = useState(0)

	React.useEffect(() => {
		const renderCols = Math.floor(width / widthColumn)
		setCountCols(renderCols)
	}, [width, widthColumn])

	// const loadMorePosts = () => {
	//   setLoading(true)
	//   dispatch(fetchMorePosts())
	//   setLoading(false)
	// }

	const renderComponents = () => {

		const components = posts.map((obj, i) => (
			<Post
				key={i}
				id={obj.id}
				isFullPost={false}
				images={obj.image}
				videos={obj.video && obj.video}
				title={obj.title}
				slug={obj.slug}
				loading={loading}
				isHomePost
			/>
		))

		const distributedComponents = Array.from(
			{ length: countCols },
			(_, index) => (
				<div key={index} className={styles.column}>
					{components.filter((_, i) => i % countCols === index)}
				</div>
			)
		)
		return distributedComponents
	}

	return (
		<>
			{renderComponents()}
		</>
	)
}

const Home = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const authStatus = useSelector(selectIsAuthStatus)
	const [postsState, setPostsState] = useState([])

	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const [loadingPost, setLoadingPost] = useState(true)

	const { ref, inView } = useInView({
		threshold: 0,
	})

	useEffect(() => {
		axios.get('posts').then(res => {
			setPostsState(res.data)
			setLoading(false)

		})
	}, [])
	useEffect(() => {
		if (inView) {
			setLoadingPost(true)
			axios
				.get('posts')
				.then(res => {
					setPostsState([...postsState, ...res.data])
					setLoadingPost(false)
					console.log(res.data)
				})
		}
	}, [inView])

	// if (authStatus === 'error' && window.localStorage.getItem('refresh')) {
	// 	return <Navigate to='/continue' />
	// } else if (
	// 	authStatus === 'error' &&
	// 	!window.localStorage.getItem('refresh')
	// ) {
	// 	return <Navigate to='/login' />
	// }

	return (
		<div className={styles.root}>
			{loading ? <Loading /> : <Columns posts={postsState} loading={loadingPost} />}
			<div style={{width: '100%', height: '10px'}} ref={ref} />
		</div>
	)
}

export default Home
