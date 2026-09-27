import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FolderKanban,
  Settings,
  LogOut,
  Map,
  ShieldCheck,
  UserCog,
} from 'lucide-react';

const menuItems = [
  { label: 'Tableau de bord', icon: LayoutDashboard, to: '/header-dashboard' },
  { label: 'Utilisateurs', icon: Users, to: '/utilisateurs' },
  { label: 'Rôles', icon: UserCog, to: '/roles' },
  { label: 'Permissions', icon: ShieldCheck, to: '/permissions' },
  { label: 'Cartographie', icon: Map, to: '/carte-admin' },
  { label: 'Rapports', icon: BarChart3, to: '/rapports' },
  { label: 'Projets', icon: FolderKanban, to: '/projets' },
  { label: 'Paramètres', icon: Settings, to: '/parametres' },
];

function Sidebaradmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white text-slate-800">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-bold text-slate-950">
          GT
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">GeoInfra</p>
          <p className="truncate text-xs text-slate-500">Admin Panel</p>
        </div>
      </div>

      <div className="flex-1 px-3 py-5">
        <nav className="space-y-2">
          {menuItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/header-dashboard'}
              className={({ isActive }) =>
                isActive
                  ? 'flex w-full items-center gap-3 rounded-xl bg-emerald-500 px-3 py-3 text-left text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700'
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebaradmin;