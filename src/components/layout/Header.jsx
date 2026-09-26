import { useNavigate } from 'react-router-dom'
import { HiArrowRightStartOnRectangle, HiBars3 } from 'react-icons/hi2'
import { appName } from '@/config/navigation'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'

export default function Header({ onMenuClick }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 md:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Ouvrir le menu"
        className="text-slate-500 hover:text-slate-700 md:hidden"
      >
        <HiBars3 className="text-2xl" />
      </button>

      <span className="font-semibold text-slate-900">{appName}</span>

      <div className="ml-auto flex items-center gap-3">
        {user && (
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-800">
              {user.firstName ?? user.name ?? user.email}
            </p>
            <p className="text-xs text-slate-400">{user.role ?? 'Utilisateur'}</p>
          </div>
        )}

        <Button variant="secondary" size="sm" onClick={handleLogout}>
          <HiArrowRightStartOnRectangle />
          Déconnexion
        </Button>
      </div>
    </header>
  )
}
