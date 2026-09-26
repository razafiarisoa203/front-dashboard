import axios from 'axios'
import { API_BASE_URL } from './constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

api.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject(
      error.response?.data ?? { message: 'Une erreur réseau est survenue.' },
    ),
)

export default api
