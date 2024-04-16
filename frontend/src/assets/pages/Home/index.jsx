import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { selectIsAuth, selectIsAuthStatus } from '../../../redux/slices/auth'
import { fetchLogin } from '../../../redux/slices/auth'

import {
	endPagePosts,
	fetchPosts,
	updatePagePosts,
} from '../../../redux/slices/posts'

import {Post, Loading} from '@components'

import styles from './Home.module.scss'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import axios from '../../../axios.js'


export const Columns = ({ posts }) => {
	const [width, setWidth] = useState(window.innerWidth)
	const [widthColumn, setWidthColumn] = useState(260)
	// const dispatch = useDispatch()

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

	const sortedPosts = [...posts].sort(
		(a, b) => new Date(b.created_date) - new Date(a.created_date)
	)

	const renderComponents = () => {
		const components = sortedPosts.map((obj, i) => (
			<Post
				key={i}
				id={obj.id}
				isFullPost={false}
				images={obj.image}
				videos={obj.video && obj.video}
				title={obj.title}
				slug={obj.slug}
				i={i}
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

	return <>{renderComponents()}</>
}

const Wrapper = ({ children }) => {
	const [scrollTop, setScrollTop] = useState(0)

	const handleScroll = useCallback(event => {
		const { scrollTop } = event.target
		setScrollTop(scrollTop)
	}, [])

	useEffect(() => {
		const savedScrollTop = localStorage.getItem('scrollTop')
		if (savedScrollTop) {
			setScrollTop(parseInt(savedScrollTop))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('scrollTop', scrollTop)
	}, [scrollTop])

	useEffect(() => {
		const scrollableDiv = document.getElementById('scrollable-div')
		if (scrollableDiv) {
			scrollableDiv.scrollTo({ top: scrollTop })
		}
	}, [scrollTop])

	return (
		<div id='scrollable-div' onScroll={handleScroll} className={styles.root}>
			{children}
		</div>
	)
}

const Home = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const [parameters, setParameters] = useState('')
	const page = useSelector(state => state.posts.postsPage.page)
	const [isUser, setIsUser] = useState(localStorage.getItem('accessff'))
	const posts = useSelector(state => state.posts.posts.items)
	const postsStatus = useSelector(state => state.posts.posts.status)
	const authStatus = useSelector(selectIsAuthStatus)
	const [postsState, setPostsState] = useState([])

	const [loading, setLoading] = useState(false)
	const [loadingPost, setLoadingPost] = useState(false)

	const getNextPage = link => {
		if (link) {
			const queryString = link.split('?')[1]
			if (queryString) {
				return `?${queryString}`
			} else {
				return ''
			}
		}
	}

	const { ref, inView, entry } = useInView({
		threshold: 0,
	})

	useEffect(() => {
		if (inView) {
			if (isAuth) {
				dispatch(fetchPosts('')).then(res => {
					setLoadingPost(true)
				})
				// setLoadingPost(false)
				setLoading(false)
			} else {
				if (page !== 'end') {
					dispatch(fetchPosts(page)).then(res => {
						if (res.payload.next !== null) {
							dispatch(updatePagePosts(getNextPage(res.payload.next)))
							setLoadingPost(true)
							console.log(res.payload.next)
						}

						if (res.payload.next === null) {
							dispatch(endPagePosts())
						}
					})
					setLoading(false)
				}
			}
		}
	}, [inView, isAuth, page])

	return (
		<Wrapper>
			<div className={styles.columnsWrapper}>
				{loading ? <Loading /> : <Columns posts={posts} />}
			</div>
			<div
				style={{
					width: '100%',
				}}
			>
				<div style={{ width: '100%', height: '10px' }} ref={ref}></div>
			</div>
		</Wrapper>
	)
}

export default Home
