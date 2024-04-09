import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const instance = axios.create({
	// baseURL: 'http://192.168.122.96:8000/api/',
	// baseURL: `${import.meta.env.VITE_APP_API_URL}`,
	baseURL: '/api/',
	// baseURL: 'https://visualapp.ru/api/',
})

export const normalAccess = access => {
	return access.replace('fdsafhrwodddddddd', '')
}

instance.interceptors.request.use(config => {
	let token = window.localStorage.getItem('accessff')

	if (token) {
		const decodedToken = jwtDecode(token)
		const currentTime = Math.floor(Date.now() / 1000)

		const refreshToken = () => {
			const refresh = window.localStorage.getItem('refresh')

			const value = {
				refresh: refresh,
			}
			axios
				.post(`/api/auth/refresh_token/`, value)
				.then(res => {
					window.localStorage.setItem('accessff', res.data.access)
					const users = JSON.parse(localStorage.getItem('users')) || []
					const invalidObj = users.find(item => item.refresh === refresh)
					const newUsers = users.splice(users.indexOf(invalidObj), 1)
					window.localStorage.setItem('users', JSON.stringify(newUsers))

					const obj = {
						id: invalidObj.id,
						username: invalidObj.username,
						avatar: invalidObj.avatar,
						refresh: invalidObj.refresh,
						accessff: res.data.access,
					}
					users.push(obj)
					window.localStorage.setItem('users', JSON.stringify(users))
				})
				.catch(() => {
					const users = JSON.parse(localStorage.getItem('users')) || []
					const invalidObj = users.find(item => item.refresh === refresh)
					const newUsers = users.splice(users.indexOf(invalidObj), 1)
					window.localStorage.setItem('users', JSON.stringify(newUsers))
				})
		}

		if (decodedToken.exp <= currentTime) {
			refreshToken()
		}
		if (!config.skipAuthorization) {
			config.headers.Authorization = `Bearer ${normalAccess(token)}`
		}
	}

	return config
})

export default instance
