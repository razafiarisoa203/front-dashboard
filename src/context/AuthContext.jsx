import { useCallback, useEffect, useMemo, useState } from 'react'
import { DEFAULT_ROLE_ID, getRole, hasPermission, hasEveryPermission } from '../roles'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'geoinfra.session'

/**
 * Lecture tolerante : une session corrompue ou un role retire du registre
 * ne doit pas bloquer l'application, elle doit simplement etre ignoree.
 */
function readStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)
    if (!parsed?.email || !getRole(parsed.role)) return null

    return { email: parsed.email, role: parsed.role, signedInAt: parsed.signedInAt ?? null }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  // Initialisation paresseuse : la lecture du stockage ne provoque pas
  // de rendu supplementaire.
  const [session, setSession] = useState(readStoredSession)

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [session])

  const signIn = useCallback(({ email, role = DEFAULT_ROLE_ID }) => {
    const definition = getRole(role)
    if (!definition) return false

    setSession({ email, role: definition.id, signedInAt: new Date().toISOString() })
    return true
  }, [])

  const signOut = useCallback(() => setSession(null), [])

  const value = useMemo(() => {
    const role = getRole(session?.role)

    return {
      user: session,
      role,
      roleId: role?.id ?? null,
      isAuthenticated: Boolean(session),
      signIn,
      signOut,
      can: (permission) => hasPermission(session?.role, permission),
      canAll: (permissions) => hasEveryPermission(session?.role, permissions),
    }
  }, [session, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
