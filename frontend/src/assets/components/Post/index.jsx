import React, { useEffect, useRef, useState } from 'react'
import styles from './Post.module.scss'
import clsx from 'clsx'
import UserInfo from '../../components/UserInfo'
import { Link } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation } from 'swiper/modules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Loading from '../Loading/Loading'

export const removeApiUrl = url => {
	return url.replace('api:8000', 'visualapp.ru')
}

const Post = ({ isHomePost, isFullPost, title, images, videos, slug, i }) => {
	const [aspectRatio, setAspectRatio] = useState({})
	const [aspectRatioHome, setAspectRatioHome] = useState({})
	const videoRef = useRef(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)

	function getMeta(url, callback) {
		const img = new Image()
		img.src = url
		img.onload = function () {
			callback(this.width, this.height)
		}
	}

	const handleMouseOver = () => {
		videoRef.current.play()
		setIsPlaying(true)
	}

	const handleMouseOut = () => {
		videoRef.current.pause()
		setIsPlaying(false)
	}

	useEffect(() => {
		if (!isFullPost && images.length) {
			const image = new Image()
			image.src = `https://visualapp.ru${images[0].image}`
			image.onload = () => setIsLoaded(true)
		} else if (!isFullPost && videos) {
			const video = document.createElement('video')
			video.src = `https://visualapp.ru${videos[0].video}`
			video.oncanplaythrough = () => setIsLoaded(true)
		}
	}, [images, videos])

	useEffect(() => {
		if (images && isFullPost) {
			images.forEach(img => {
				getMeta(removeApiUrl(img.image), (width, height) => {
					const aspect = width / height

					if (aspect < 0.5625) {
						setAspectRatio(prev => ({
							...prev,
							[removeApiUrl(img.image)]: 0.5625,
						}))
					} else {
						setAspectRatio(prev => ({
							...prev,
							[removeApiUrl(img.image)]: width / height,
						}))
					}
				})
			})
		} else if (images && isHomePost) {
			images.forEach(img => {
				getMeta(`https://visualapp.ru${img.image}`, (width, height) => {
					const aspect = width / height

					if (aspect < 0.5625) {
						setAspectRatioHome(prev => ({
							...prev,
							[`https://visualapp.ru${img.image}`]: 0.5625,
						}))
					} else {
						setAspectRatioHome(prev => ({
							...prev,
							[`https://visualapp.ru${img.image}`]: width / height,
						}))
					}
				})
			})
		}
	}, [images])

	// if (loading) {
	// 	return (
	// 		<div className={styles.loading}>
	// 			<Loading />
	// 		</div>
	// 	);
	// }

	return (
		<Swiper
			modules={[Navigation]}
			spaceBetween={0}
			slidesPerView={1}
			loop
			navigation={{
				prevEl: '.prev',
				nextEl: '.next',
			}}
			className={clsx(styles.root, {
				[styles.rootFull]: isFullPost,
				[styles.rootHome]: isHomePost,
			})}
		>
			{isFullPost && (images || videos) ? (
				<Swiper
					className={clsx(styles.swiper, {
						[styles.swiperFull]: isFullPost,
						[styles.swiperHome]: isHomePost,
					})}
				>
					{(images?.length || videos) && (
						<>
							{images?.map(link => (
								<SwiperSlide key={link.id}>
									<img
										className={clsx(styles.image, {
											[styles.imageFull]: isFullPost,
											[styles.imageHome]: isHomePost,
										})}
										style={{
											aspectRatio: aspectRatio[removeApiUrl(link.image)],
										}}
										src={removeApiUrl(link.image)}
										crossOrigin='anonymous'
										loading='lazy'
										alt={`${title}${i}`}
									/>
								</SwiperSlide>
							))}
							{videos?.map(link => (
								<SwiperSlide key={link.id}>
									<video
										className={styles.video}
										src={removeApiUrl(link.video)}
										autoPlay
										controls
									/>
								</SwiperSlide>
							))}
						</>
					)}
				</Swiper>
			) : (
				<SwiperSlide className='swiper-slide-active'>
					<Link className={styles.link} to={`/posts/${slug}`}>
						{!isLoaded ? (
							<div className={styles.loading}>
								<Loading />
							</div>
						) : (
							<>
								{images && images.length ? (
									<>
										<img
											className={clsx(styles.image, {
												[styles.imageFull]: isFullPost,
												[styles.imageHome]: isHomePost,
											})}
											style={{
												aspectRatio:
													aspectRatioHome[
														`https://visualapp.ru${images[0].image}`
													],
											}}
											src={`https://visualapp.ru${images[0].image}`}
											alt={`${i}`}
											crossOrigin='anonymous'
											loading='lazy'
										/>
									</>
								) : (
									<>
										{videos && videos[0] && (
											<video
												className={clsx(styles.image, {
													[styles.imageFull]: isFullPost,
													[styles.imageHome]: isHomePost,
												})}
												muted
												loop
												ref={videoRef}
												src={`https://visualapp.ru${videos[0].video}`}
												onMouseOver={handleMouseOver}
												onMouseOut={handleMouseOut}
											>
												<source
													src={`https://visualapp.ru${videos[0].video}`}
												/>
											</video>
										)}
									</>
								)}
							</>
						)}
					</Link>
				</SwiperSlide>
			)}
			<button className='prev'>
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<button className='next'>
				<FontAwesomeIcon icon={faChevronRight} />
			</button>{' '}
		</Swiper>
	)
}

export default Post
