import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const instance = axios.create({
	// baseURL: 'http://192.168.122.96:8000/api/',
	// baseURL: `${import.meta.env.VITE_APP_API_URL}`,
	// baseURL: '/api/',
	baseURL: 'http://localhost:8000/api/',
})

export const normalAccess = access => {
	return access.replace('fdsafhrwodddddddd', '')
}

instance.interceptors.request.use(config => {
	let token = window.sessionStorage.getItem('accessff')

	if (token) {
		const decodedToken = jwtDecode(token)
		const currentTime = Math.floor(Date.now() / 1000)

		const refreshToken = () => {
			const refresh = window.sessionStorage.getItem('refresh')

			const value = {
				refresh: refresh,
			}
			axios.post(`/api/auth/refresh_token/`, value).then(res => {
				window.sessionStorage.setItem('accessff', res.data.access)
				const users = JSON.parse(sessionStorage.getItem('users')) || []
				const invalidObj = users.find(item => item.refresh === refresh)
				const newUsers = users.splice(users.indexOf(invalidObj), 1)
				window.sessionStorage.setItem('users', JSON.stringify(newUsers))

				const obj = {
					id: invalidObj.id,
					username: invalidObj.username,
					avatar: invalidObj.avatar,
					refresh: invalidObj.refresh,
					accessff: res.data.access,
				}
				users.push(obj)
				window.sessionStorage.setItem('users', JSON.stringify(users))
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
