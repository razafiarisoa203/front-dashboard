import React, { useState } from 'react';
import { X, User, Bell, Globe } from 'lucide-react';

function Navbaradmin() {
  const [langue, setLangue] = useState('FR');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profile = {
    nom: 'Rakoto',
    prenom: 'Aina',
    role: 'Administratrice',
    email: 'aina.rakoto@geoinfra.mg',
  };

  return (
    <>
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 text-slate-800 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Navbaradmin</h1>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
            <Globe size={18} className="text-slate-500" />
            <select
              value={langue}
              onChange={(e) => setLangue(e.target.value)}
              className="cursor-pointer bg-transparent text-sm text-slate-700 focus:outline-none"
            >
              <option value="FR" className="bg-white text-slate-800">Français</option>
              <option value="MG" className="bg-white text-slate-800">Malagasy</option>
            </select>
          </div>

          <button className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100" aria-label="Notifications">
            <Bell size={22} />
          </button>

          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Profil"
          >
            <User size={22} />
          </button>
        </div>
      </nav>

      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Profil</h2>
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                {profile.prenom.charAt(0)}{profile.nom.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{profile.prenom} {profile.nom}</p>
                <p className="text-sm text-emerald-700">{profile.role}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">Nom</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{profile.nom}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">Prénom</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{profile.prenom}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">Rôle</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{profile.role}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">Email</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{profile.email}</p>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
            >
              Modifier le profil
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbaradmin;