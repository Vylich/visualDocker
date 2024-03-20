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

const Post = ({
	isHomePost,
	isFullPost,
	title,
	images,
	videos,
	slug,
	loading,
}) => {
	const [aspectRatio, setAspectRatio] = useState({})
	const [aspectRatioHome, setAspectRatioHome] = useState({})
	const videoRef = useRef(null)
	const [isPlaying, setIsPlaying] = useState(false)

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
		if (images && isFullPost) {
			images.forEach(img => {
				getMeta(img.image, (width, height) => {
					const aspect = width / height

					if (aspect < 0.5625) {
						setAspectRatio(prev => ({ ...prev, [img.image]: 0.5625 }))
					} else {
						setAspectRatio(prev => ({
							...prev,
							[img.image]: width / height,
						}))
					}
				})
			})
		} else if (images && isHomePost) {
			images.forEach(img => {
				getMeta(`${import.meta.env.VITE_APP_API_URL}${img.image}`, (width, height) => {
					const aspect = width / height

					if (aspect < 0.5625) {
						setAspectRatioHome(prev => ({
							...prev,
							[`${import.meta.env.VITE_APP_API_URL}${img.image}`]: 0.5625,
						}))
					} else {
						setAspectRatioHome(prev => ({
							...prev,
							[`${import.meta.env.VITE_APP_API_URL}${img.image}`]: width / height,
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
										style={{ aspectRatio: aspectRatio[link.image] }}
										src={link.image}
										crossOrigin='anonymous'
										loading='lazy'
										alt={title}
									/>
								</SwiperSlide>
							))}
							{videos?.map(link => (
								<SwiperSlide key={link.id}>
									<video
										className={styles.video}
										src={link.video}
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
						{loading ? (
							<div className={styles.loading}>
								<Loading />
							</div>
						) : (
							<>
								{images && images.length ? (
									<img
										className={clsx(styles.image, {
											[styles.imageFull]: isFullPost,
											[styles.imageHome]: isHomePost,
										})}
										style={{
											aspectRatio:
												aspectRatioHome[
													`${import.meta.env.VITE_APP_API_URL}${images[0].image}`
												],
										}}
										src={`${import.meta.env.VITE_APP_API_URL}${images[0].image}`}
										alt={title}
										crossOrigin='anonymous'
										loading='lazy'
									/>
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
												src={`${import.meta.env.VITE_APP_API_URL}${videos[0].video}`}
												onMouseOver={handleMouseOver}
												onMouseOut={handleMouseOut}
											>
												<source
													src={`${import.meta.env.VITE_APP_API_URL}${videos[0].video}`}
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
