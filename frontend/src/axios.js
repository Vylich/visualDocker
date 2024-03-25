import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const instance = axios.create({
	// baseURL: 'http://192.168.217.105:8000/api/',
	baseURL: `${import.meta.env.VITE_APP_API_URL}/api/`,
})



instance.interceptors.request.use(config => {
	let token = window.localStorage.getItem('access')

	if (token) {
		const decodedToken = jwtDecode(token)
		const currentTime = Math.floor(Date.now() / 1000)



		const refreshToken = () => {
			const refresh = window.localStorage.getItem('refresh')

			const value = {
				refresh: refresh,
			}
			axios
				.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/refresh_token/`, value)
				.then(res => {
					window.localStorage.setItem('access', res.data.access)
					const users = JSON.parse(localStorage.getItem('users')) || []
					const invalidObj = users.find(item => item.refresh === refresh)
					const newUsers = users.splice(users.indexOf(invalidObj), 1)
					window.localStorage.setItem('users', JSON.stringify(newUsers))

					const obj = {
						id: invalidObj.id,
						username: invalidObj.username,
						avatar: invalidObj.avatar,
						refresh: invalidObj.refresh,
						access: res.data.access,
					}
					users.push(obj)
					window.localStorage.setItem('users', JSON.stringify(users))
				})
		}

		if (decodedToken.exp <= currentTime) {
			refreshToken()
		}
		if (!config.skipAuthorization) {
			config.headers.Authorization = `Bearer ${token}`
		}

	}

	return config
})

export default instance
