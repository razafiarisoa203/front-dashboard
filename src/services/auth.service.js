import api from '@/lib/api'
import { STORAGE_KEYS } from '@/lib/constants'

export const authService = {
  async login(credentials) {
    const data = await api.post('/auth/login', credentials)
    localStorage.setItem(STORAGE_KEYS.token, data.token)
    if (data.user) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(data.user))
    }
    return data.user ?? null
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.user)
  },
}

export default authService
