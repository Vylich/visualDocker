import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchRegister, selectIsAuth } from '../../../redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import axios from '../../../axios'

import logo from '../../../img/logo/Logo.svg'

import styles from './Registration.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const Registration = () => {
	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()
	// const inputFileRef = React.useRef(null)
	const [phoneNumber, setPhoneNumber] = useState('')
	const [isShowPass, setIsShowPass] = useState(false)
	const [typePass, setTypePass] = useState('password')
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
	} = useForm({
		defaultValues: {
			username: '',
			password: '',
			password2: '',
			email: '',
		},
		mode: 'onChange',
	})

	const validatePassword = value => {
		const password = watch('password')
		return value === password || 'Пароли не совпадают'
	}
	const handleShow = () => {
		if (isShowPass) {
			setIsShowPass(false)
			setTypePass('text')
		} else {
			setIsShowPass(true)
			setTypePass('password')
		}
	}
	const onSubmit = async value => {
		const values = { ...value }
		const data = await dispatch(fetchRegister(values))

		if (!data.payload) {
			return alert('Не удалось зарегистрироваться')
		} else {
			navigate('/login')
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.container__block}>
				<header className={styles.container__header}>
					<img src={logo} width={70} alt='Логотип' />
					<h2>Регистрация Visual</h2>
				</header>
				<form
					className={styles.container__form}
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* <div className={styles.field}>
            <input
              type="text"
              required
              placeholder="Номер телефона"
              {...register("phone", {
                required: "Укажите номер телефона",
                pattern: {
                  value:
                    /^(\+7|8)?[ -]?(\(?\d{3}\)?[ -]?\d{3}[ -]?\d{2}[ -]?\d{2})$/,
                  message: "Неверный номер телефона",
                },
              })}
            />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div> */}
					<div className={styles.field}>
						<input
							type='text'
							required
							placeholder='Почта'
							{...register('email', {
								required: 'Укажите Email',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Неверный email',
								},
							})}
						/>
						{errors.email && (
							<span className={styles.error}>{errors.email.message}</span>
						)}
					</div>
					{/* <input
            type="text"
            required
            placeholder="Имя"
            {...register("first_name", { required: "Укажите имя" })}
          />
          <input
            type="text"
            required
            placeholder="Фамилия"
            {...register("last_name", { required: "Укажите фамилию" })}
          /> */}
					<div className={styles.field}>
						<input
							type='text'
							required
							placeholder='Имя пользователя'
							{...register('username', {
								required: 'Имя пользователя обязательно',
								minLength: {
									value: 4,
									message: 'Имя пользователя должно быть не менее 4 символов',
								},
								maxLength: {
									value: 20,
									message: 'Имя пользователя должно быть не более 20 символов',
								},
								pattern: {
									value: /^[A-Za-z_=\-><\*#!.]+$/i,
									message: 'Только латиница без пробелов',
								},
							})}
						/>
						{errors.username && (
							<span className={styles.error}>{errors.username.message}</span>
						)}
					</div>
					<div className={styles.field}>
						<input
							type={typePass}
							required
							placeholder='Пароль'
							{...register('password', {
								required: 'Укажите пароль',
								minLength: 8,
							})}
						/>
						<button
							type='button'
							onClick={handleShow}
							className={styles.showPass}
						>
							{!isShowPass ? (
								<FontAwesomeIcon icon={faEye} />
							) : (
								<FontAwesomeIcon icon={faEyeSlash} />
							)}
						</button>

						{errors.password && (
							<span className={styles.error}>
								Пароль должен содержать минимум 8 символов
							</span>
						)}
					</div>
					<div className={styles.field}>
						<input
							type={typePass}
							required
							placeholder='Повторите пароль'
							{...register('password2', {
								required: 'Повторите пароль',
								validate: validatePassword,
							})}
						/>
						<button
							type='button'
							onClick={handleShow}
							className={styles.showPass}
						>
							{!isShowPass ? (
								<FontAwesomeIcon icon={faEye} />
							) : (
								<FontAwesomeIcon icon={faEyeSlash} />
							)}
						</button>

						{errors.password2 && (
							<span className={styles.error}>{errors.password2.message}</span>
						)}
					</div>
					<button
						type='submit'
						disabled={!isValid}
						className={isValid ? styles.btnReg : styles.disabled}
					>
						Регистрация
					</button>
				</form>
			</div>
			<div className={styles.container__block}>
				<div className={styles.container__login}>
					<p>Есть аккаунт?</p>
					<Link to='/login'>Войти</Link>
				</div>
			</div>
		</div>
	)
}
