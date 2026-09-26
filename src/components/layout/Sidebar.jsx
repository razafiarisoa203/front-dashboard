import { NavLink } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'
import { navigation } from '@/config/navigation'
import { cn } from '@/lib/utils'

function NavItems({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {navigation.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-600 hover:bg-slate-100',
            )
          }
        >
          <Icon className="text-lg" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white p-4 transition-transform md:static md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 md:hidden"
            aria-label="Fermer"
          >
            <HiXMark className="text-xl" />
          </button>
        </div>

        <NavItems onNavigate={onClose} />
      </aside>
    </>
  )
}
