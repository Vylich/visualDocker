import React, { useEffect, useState } from 'react'
import styles from './AddPost.module.scss'
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import axios from '../../../axios'
import { default as myAxios } from 'axios'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../../redux/slices/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronDown,
	faChevronLeft,
	faChevronRight,
	faFileArrowUp,
	faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { v4 } from 'uuid'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/scss'
import 'swiper/scss/navigation'
import './slider.scss'

import ImageCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const AddPost = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const isAuth = useSelector(selectIsAuth)
	const isUserDataLoaded = state => state.auth.data !== null
	const userdata = useSelector(state =>
		isUserDataLoaded(state) ? state.auth.data.user : null
	)

	const [isLoading, setLoading] = useState(false)
	const [isChecked, setIsChecked] = useState(true)
	const [isCheckedComments, setIsCheckedComments] = useState(true)

	const [isOpen, setIsOpen] = useState(false)
	const [saveFromLink, setSaveFromLink] = useState(false)
	const [text, setText] = React.useState('')
	const [link, setLinks] = React.useState('')
	const [title, setTitle] = React.useState('')
	const [tags, setTags] = React.useState('')
	const [linkImg, setLinkImg] = React.useState('')
	const [isValidLinkImg, setIsValidLinkImg] = useState(true)
	const [isSlider, setIsSlider] = useState(false)

	const [image, setImage] = useState([])
	const [imageUrl, setImageUrl] = React.useState([])
	const [video, setVideo] = useState([])
	const [videoUrls, setVideoUrls] = useState([])
	const [aspectRatio, setAspectRatio] = useState('')
	const inputFileRef = React.useRef(null)

	const [crop, setCrop] = useState({});
	const isEditing = Boolean(id)

	function getMeta(imageUrl, callback) {
		const img = new Image()
		img.src = imageUrl
		img.onload = function () {
			callback(this.width, this.height, imageUrl)
		}
	}

	useEffect(() => {
		if (imageUrl) {
			imageUrl.forEach(image => {
				getMeta(image, (width, height, url) => {
					const aspect = width / height
					if (aspect < 0.5625) {
						setAspectRatio(prev => ({ ...prev, [url]: 0.5625 }))
					} else {
						setAspectRatio(prev => ({ ...prev, [url]: width / height }))
						setCrop(prev => ({ ...prev, [url]: { aspect } }));

					}
				})
			})
		}
	}, [imageUrl])


	const handleChangeFile = evt => {
		Array.from(evt.target.files).filter(file => file.type.includes('image')).forEach(item => {
			setImage(prev => [...prev, item])
		})

		Array.from(evt.target.files).filter(file => file.type.includes('video')).forEach(item => {
			setVideo(prev => [...prev, item])
		})


		const files = Array.from(evt.target.files)

		for (let i = 0; i < files.length; i++) {
			const file = files[i]

			if (file.type.includes('image')) {

				setImageUrl(prev => [...prev, URL.createObjectURL(file)])
			} else if (file.type.includes('video')) {

				setVideoUrls(prev => [...prev, URL.createObjectURL(file)])
			}
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl([])
		setImage([])
		setVideo([])
		setVideoUrls([])
	}

	const onSubmit = async () => {
		try {
			setLoading(true)
			const formData = new FormData()
			const arrTags = tags.split(',').map(tag => tag.trim())
			if(image.length < 1) {
				formData.append('image', '')
			}
			if(video.length < 1) {
				formData.append('video', '')
			}

			image.forEach(Img => {
				formData.append('image', Img)
			})


			video.forEach(Vid => {
				formData.append('video', Vid)
			})

			if (isCheckedComments) {
				formData.append('avialable_comment', true)
			}
			formData.append('name', title)
			arrTags.forEach(Tag => {
				formData.append('tags', Tag)
			})
			formData.append('text', text)
			formData.append('author', userdata.username)

			console.log(formData)

			const { data } = isEditing
				? await axios.patch(`/posts/${id}/`, formData)
				: await axios.post('/posts/', formData)

			navigate(`/posts/${data.slug}`)
		} catch (err) {
			console.warn(err)
			alert('Не удалось создать пост')
		}
	}

	React.useEffect(() => {
		if (id) {
			axios
				.get(`/posts/${id}`)
				.then(({ data }) => {
					setTitle(data.name)
					setImageUrl(data.image)
					setText(data.text)
					setTags(data.tags.join(','))
				})
				.catch(err => {
					console.warn(err)
					alert('Не удалось получить пост')
				})
		}
	}, [])

	const handleCheckedComments = () => {
		if (isCheckedComments === true) {
			setIsCheckedComments(false)
			return
		}
		if (isCheckedComments === false) {
			setIsCheckedComments(true)
			return
		}
	}

	const openOptions = () => {
		if (isOpen === true) {
			setIsOpen(false)
		} else {
			setIsOpen(true)
		}
	}

	const handleClick = () => {
		if (saveFromLink === true) {
			setSaveFromLink(false)
		} else {
			setSaveFromLink(true)
		}
	}

	const addLinkImg = async () => {
		try {
			const response = await fetch(linkImg)
			const blob = await response.blob()
			const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

			setImage(file)
			setImageUrl(linkImg)
		} catch (err) {
			alert('неверная ссылка на изображение')
		}
	}

	const handleImageUrlChange = val => {
		setLinkImg(val)
		const urlPattern =
			/^((http|https):\/\/.*\.(jpeg|jpg|gif|png))|(data:image\/(jpeg|jpg|gif|png);base64,([A-Za-z0-9+/=]+))$/

		if (urlPattern.test(val)) {
			setIsValidLinkImg(true)
		} else {
			setIsValidLinkImg(false)
		}
	}

	if (!window.localStorage.getItem('access')) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.root}>
			<header className={styles.headerAddPost}>
				<h2>Создание поста</h2>
				<button onClick={onSubmit}>
					{isEditing ? 'Сохранить' : 'Опубликовать'}
				</button>
			</header>
			<div className={styles.wrap}>
				<div className={styles.fileWrapper}>
					<div className={styles.imageBlock}>
						{!imageUrl.length && !videoUrls.length && (
							<button
								className={styles.buttonImage}
								onClick={() => inputFileRef.current.click()}
							>
								<FontAwesomeIcon icon={faFileArrowUp} />
								<span>Выберите файл</span>{' '}
								<span>
									Рекомендуем использовать файлы высокого качества в формате
									.jpg (размером меньше 20MB) или .mp4 (размером меньше 200MB)
								</span>
							</button>
						)}

						<input
							ref={inputFileRef}
							type='file'
							multiple
							onChange={handleChangeFile}
							hidden
						/>

						{image.length || video.length ? (
							<>
								<button className='prev'>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								<button className='next'>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
								<button
								className={styles.buttonAddMore}
								onClick={() => inputFileRef.current.click()}
							>
								<FontAwesomeIcon icon={faPlus} />
							</button>
								<Swiper
									modules={[Navigation]}
									spaceBetween={0}
									slidesPerView={1}
									initialSlide={0}
									navigation={{
										prevEl: '.prev',
										nextEl: '.next',
									}}
									allowTouchMove={true}
									loop
									className={styles.sliderWrap}
								>
									{imageUrl.map((link, i) => (
										<SwiperSlide
											className={styles.slide}
											style={{ aspectRatio: aspectRatio[link] }}
											key={i}
										>
											<img
												className={styles.image}
												src={`${link}`}
												alt='Uploaded'
												style={{ aspectRatio: aspectRatio[link] }}
											/>
										</SwiperSlide>
									))}
									{videoUrls.map((link, i) => (
										<SwiperSlide
											className={styles.slideVideo}
											style={{ aspectRatio: aspectRatio[link] }}
											key={i}
										>
											<video
												className={styles.video}
												src={`${link}`}
												autoPlay
												controls
												style={{ aspectRatio: aspectRatio[link] }}
												alt='Uploaded'
											/>
										</SwiperSlide>
									))}
								</Swiper>
							</>
						) : null}
						{(imageUrl && imageUrl.length) || videoUrls.length ? (
							<button
								className={styles.buttonImageDel}
								onClick={onClickRemoveImage}
							>
								Удалить
							</button>
						) : null}
					</div>

					{saveFromLink && (
						<div className={styles.addWrapper}>
							<div className={styles.field}>
								<label htmlFor='upload-tags'>Ссылка на изображение</label>
								<input
									type='text'
									name='tags'
									id='upload-tags'
									placeholder='Добавить ссылку на изображение'
									value={linkImg}
									onChange={e => handleImageUrlChange(e.target.value)}
								/>
								{!isValidLinkImg && (
									<p style={{ color: 'red' }}>
										Please enter a valid image URL for
									</p>
								)}
								<button className={styles.addLink} onClick={addLinkImg}>
									Добавить
								</button>
							</div>
						</div>
					)}
					<button className={styles.buttonLink} onClick={handleClick}>
						Сохранить из URL-адреса
					</button>
				</div>
				<div className={styles.addWrapper}>
					<div className={styles.field}>
						<label htmlFor='upload-title'>Название</label>
						<input
							type='text'
							name='title'
							placeholder='Добавить название'
							value={title}
							onChange={e => setTitle(e.target.value)}
							id='upload-title'
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor='upload-text'>Описание</label>
						<textarea
							name='description'
							id='upload-text'
							placeholder='Добавить описание'
							value={text}
							rows={5}
							onChange={e => setText(e.target.value)}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor='upload-link'>Ссылка</label>
						<input
							type='text'
							name='link'
							id='upload-link'
							placeholder='Добавить ссылку'
							value={link}
							onChange={e => setLinks(e.target.value)}
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor='upload-tags'>Теги</label>
						<input
							type='text'
							name='tags'
							id='upload-tags'
							placeholder='Добавить теги (через запятую)'
							value={tags}
							onChange={e => setTags(e.target.value)}
						/>
					</div>
					<div className={styles.moreOption}>
						<div className={styles.select} onClick={openOptions}>
							<p>Дополнительные настройки</p>
							<FontAwesomeIcon
								icon={faChevronDown}
								style={{ color: '#7A4AD8' }}
							/>
						</div>
						<div className={isOpen ? styles.options : styles.optionsClose}>
							<div className={styles.option}>
								<label onClick={handleCheckedComments} htmlFor=''>
									<input
										className={styles.hidden_checkbox}
										type='checkbox'
										name='comments'
										id='upload-comments'
										checked={isCheckedComments}
										readOnly
									/>
									<span className={styles.container__checkbox}></span>
									<span>Разрешить комментировать</span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddPost
