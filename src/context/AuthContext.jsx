import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from '@/context/auth-context'
import { STORAGE_KEYS } from '@/lib/constants'
import authService from '@/services/auth.service'

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.user)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), setUser, logout }),
    [user, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
