import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Plus, Check, Lock, Users } from 'lucide-react';
import Navbaradmin from '../admin/Navbaradmin';
import Sidebaradmin from '../admin/Sidebaradmin';

const navItems = ['Vue d’ensemble', 'Mon profil', 'Rôles', 'Permissions'];

const permissionGroups = [
  { group: 'Dashboard', label: 'Voir le tableau de bord', key: 'dashboard.view' },
  { group: 'Utilisateurs', label: 'Voir les utilisateurs', key: 'users.view' },
  { group: 'Utilisateurs', label: 'Créer un utilisateur', key: 'users.create' },
  { group: 'Utilisateurs', label: 'Modifier un utilisateur', key: 'users.update' },
  { group: 'Utilisateurs', label: 'Supprimer un utilisateur', key: 'users.delete' },
  { group: 'Rôles', label: 'Voir les rôles', key: 'roles.view' },
  { group: 'Rôles', label: 'Gérer les rôles', key: 'roles.manage' },
  { group: 'Rapports', label: 'Voir les rapports', key: 'reports.view' },
  { group: 'Rapports', label: 'Exporter les rapports', key: 'reports.export' },
  { group: 'Paramètres', label: 'Gérer les paramètres', key: 'settings.manage' },
];

const permissionsByRole = {
  Administrateur: [
    'dashboard.view',
    'users.view',
    'users.create',
    'users.update',
    'users.delete',
    'roles.view',
    'roles.manage',
    'reports.view',
    'reports.export',
    'settings.manage',
  ],
  Gestionnaire: ['dashboard.view', 'users.view', 'users.create', 'users.update', 'roles.view', 'reports.view'],
  Décideur: ['dashboard.view', 'reports.view', 'roles.view'],
  Utilisateur: ['dashboard.view', 'users.view'],
};

export default function Utilisateur() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Mon profil');
  const [selectedRole, setSelectedRole] = useState('Administrateur');

  const handleNavClick = (item) => {
    if (item === 'Permissions') {
      navigate('/permissions');
      return;
    }

    setActiveTab(item);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <Sidebaradmin />

      <div className="flex flex-1 flex-col">
        <Navbaradmin />

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-600">Utilisateur</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Partie utilisateur</h1>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
            >
              <Plus size={16} />
              Ajouter un compte
            </button>
          </div>

          <nav className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleNavClick(item)}
                className={
                  activeTab === item
                    ? 'rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm'
                    : 'rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900'
                }
              >
                {item}
              </button>
            ))}
          </nav>

          {activeTab === 'Permissions' ? (
            <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Permissions</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Gestion des droits</h2>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  {permissionsByRole[selectedRole]?.length || 0} permissions
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
                <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Rôles</p>

                  <div className="space-y-2">
                    {Object.keys(permissionsByRole).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={
                          selectedRole === role
                            ? 'w-full rounded-xl bg-emerald-600 px-3 py-2.5 text-left text-sm font-semibold text-white shadow-sm'
                            : 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-100'
                        }
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </aside>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-500">Rôle sélectionné</p>
                      <h3 className="text-xl font-bold text-slate-900">{selectedRole}</h3>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                      <Lock size={14} className="text-emerald-600" />
                      Sécurité
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(
                      permissionGroups.reduce((groups, permission) => {
                        if (!groups[permission.group]) groups[permission.group] = [];
                        groups[permission.group].push(permission);
                        return groups;
                      }, {})
                    ).map(([group, permissions]) => (
                      <div key={group} className="rounded-xl border border-slate-200 bg-white p-3">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{group}</p>
                        <div className="space-y-2">
                          {permissions.map((permission) => {
                            const isAllowed = permissionsByRole[selectedRole]?.includes(permission.key);

                            return (
                              <div key={permission.key} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                                <div>
                                  <p className="text-sm font-medium text-slate-800">{permission.label}</p>
                                  <p className="text-xs text-slate-500">{permission.key}</p>
                                </div>
                                <span className={isAllowed ? 'flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-white' : 'flex h-6 w-6 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-300'}>
                                  {isAllowed ? <Check size={14} /> : null}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : activeTab === 'Mon profil' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Profil</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Permissions utilisateur</h2>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  5 permissions
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    AR
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">Aina Rakoto</p>
                    <p className="text-sm text-slate-500">aina.rakoto@geoinfra.mg</p>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span className="font-medium text-slate-700">Rôle actuel : Administrateur</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['dashboard.view', 'users.view', 'reports.view', 'roles.manage', 'settings.view'].map((permission) => (
                    <span key={permission} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Section</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{activeTab}</h2>
              <p className="mt-3 text-slate-500">Cette vue utilisateur est prête pour la gestion de cette section.</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
