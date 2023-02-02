import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://51.68.80.15:8000/api/',
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
