import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * Garde de route. Deux refus distincts :
 *  - pas de session  -> page de connexion, en memorisant la destination
 *  - permission absente -> page d'acces refuse
 */
export default function ProtectedRoute({ permission }) {
  const { isAuthenticated, can } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (permission && !can(permission)) {
    return <Navigate to="/acces-refuse" state={{ from: location.pathname, permission }} replace />
  }

  return <Outlet />
}
