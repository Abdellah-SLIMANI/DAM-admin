import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://13.36.215.163:8000/api/',
    timeout: 5000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(
            (error.response && error.response.data) || 'Something went wrong!'
        )
)

export default axiosInstance
