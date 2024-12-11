declare global {
  interface Window {
    Clerk?: {
      session?: {
        getToken(): Promise<string>
      }
    }
  }
}

import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8787/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

api.interceptors.request.use(async (config) => {
  const token = await window.Clerk?.session?.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || 'An error occurred'
    toast.error(message)
    return Promise.reject(error)
  }
)

export default api