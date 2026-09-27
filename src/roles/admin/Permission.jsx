import React, { useMemo, useState } from 'react';
import {
  ShieldCheck,
  Search,
  Users,
  Lock,
  Check,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

import Sidebaradmin from './Sidebaradmin';
import Navbaradmin from './Navbaradmin';

const navItems = ['Vue d’ensemble', 'Utilisateurs', 'Rôles', 'Permissions', 'Historique'];

const permissionCatalog = [
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

const initialPermissions = {
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
  Gestionnaire: [
    'dashboard.view',
    'users.view',
    'users.create',
    'users.update',
    'roles.view',
    'reports.view',
  ],
  Décideur: ['dashboard.view', 'reports.view', 'roles.view'],
  Utilisateur: ['dashboard.view', 'users.view'],
};

const roleStats = {
  Administrateur: 'Accès complet',
  Gestionnaire: 'Accès modéré',
  Décideur: 'Accès lecture',
  Utilisateur: 'Accès limité',
};

// Groupes uniques dans l'ordre
const permissionGroups = [...new Set(permissionCatalog.map((p) => p.group))];

export default function Permission() {
  const [activeTab, setActiveTab] = useState('Permissions');
  const [selectedRole, setSelectedRole] = useState('Administrateur');
  const [searchTerm, setSearchTerm] = useState('');
  const [rolePermissions, setRolePermissions] = useState(initialPermissions);
  const [currentStep, setCurrentStep] = useState(0);

  const filteredPermissions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return permissionCatalog.filter((permission) => {
      if (!query) return true;
      return (
        permission.label.toLowerCase().includes(query) ||
        permission.group.toLowerCase().includes(query) ||
        permission.key.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  // Groupes disponibles selon la recherche
  const availableGroups = useMemo(() => {
    return permissionGroups.filter((group) =>
      filteredPermissions.some((p) => p.group === group)
    );
  }, [filteredPermissions]);

  // Permissions de l'étape courante
  const currentGroup = availableGroups[currentStep] || availableGroups[0];
  const currentGroupPermissions = filteredPermissions.filter(
    (p) => p.group === currentGroup
  );

  const togglePermission = (permissionKey) => {
    const currentPermissions = rolePermissions[selectedRole] || [];
    const hasPermission = currentPermissions.includes(permissionKey);

    setRolePermissions((previousPermissions) => ({
      ...previousPermissions,
      [selectedRole]: hasPermission
        ? currentPermissions.filter((permission) => permission !== permissionKey)
        : [...currentPermissions, permissionKey],
    }));
  };

  const selectAllInGroup = () => {
    const keys = currentGroupPermissions.map((p) => p.key);
    const current = rolePermissions[selectedRole] || [];

    setRolePermissions((prev) => ({
      ...prev,
      [selectedRole]: [...new Set([...current, ...keys])],
    }));
  };

  const deselectAllInGroup = () => {
    const keys = currentGroupPermissions.map((p) => p.key);
    const current = rolePermissions[selectedRole] || [];

    setRolePermissions((prev) => ({
      ...prev,
      [selectedRole]: current.filter((k) => !keys.includes(k)),
    }));
  };

  const selectedPermissionCount = rolePermissions[selectedRole]?.length || 0;

  const goNext = () => {
    if (currentStep < availableGroups.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

  // Reset step quand on change de rôle ou de recherche
  React.useEffect(() => {
    setCurrentStep(0);
  }, [selectedRole, searchTerm]);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <Sidebaradmin />

      <div className="flex flex-1 flex-col">
        <Navbaradmin />

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
              Administration
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Gestion des permissions
            </h1>
          </div>

          <nav className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveTab(item)}
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

          {activeTab !== 'Permissions' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
                Menu
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{activeTab}</h2>
              <p className="mt-3 text-slate-500">
                Cette section est prête à recevoir le contenu associé à ce menu.
              </p>
            </section>
          ) : (
            <section className="space-y-6">
              {/* Stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Rôles</span>
                    <ShieldCheck size={18} className="text-emerald-600" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900">4</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Permissions</span>
                    <Lock size={18} className="text-sky-600" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900">10</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-slate-500">Utilisateurs</span>
                    <Users size={18} className="text-violet-600" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900">128</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
                      Attribution
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                      Rôles et permissions
                    </h2>
                  </div>

                  <div className="relative w-full max-w-md">
                    <Search
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Rechercher une permission"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none ring-0 transition focus:border-emerald-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
                  {/* Sidebar rôles */}
                  <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Rôles
                    </p>

                    <div className="space-y-2">
                      {Object.keys(rolePermissions).map((role) => (
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
                          <div className="flex items-center justify-between gap-3">
                            <span>{role}</span>
                            <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold">
                              {rolePermissions[role]?.length || 0}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </aside>

                  {/* Zone step-by-step */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    {/* Header rôle */}
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Rôle sélectionné</p>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {selectedRole}
                        </h3>
                      </div>

                      <div className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        {selectedPermissionCount} permissions
                      </div>
                    </div>

                    <div className="mb-5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                      {roleStats[selectedRole]}
                    </div>

                    {/* ===== STEPPER ===== */}
                    {availableGroups.length > 0 ? (
                      <>
                        {/* Indicateur d'étapes */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between gap-1">
                            {availableGroups.map((group, index) => {
                              const isActive = index === currentStep;
                              const isCompleted = index < currentStep;
                              const groupPerms = filteredPermissions.filter(
                                (p) => p.group === group
                              );
                              const checkedCount = groupPerms.filter((p) =>
                                rolePermissions[selectedRole]?.includes(p.key)
                              ).length;
                              const allChecked =
                                checkedCount === groupPerms.length &&
                                groupPerms.length > 0;

                              return (
                                <React.Fragment key={group}>
                                  <button
                                    type="button"
                                    onClick={() => goToStep(index)}
                                    className="flex flex-col items-center gap-1.5 min-w-0 flex-1"
                                  >
                                    <span
                                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                                        isActive
                                          ? 'bg-emerald-600 text-white shadow-md ring-4 ring-emerald-100'
                                          : isCompleted || allChecked
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-slate-200 text-slate-500'
                                      }`}
                                    >
                                      {isCompleted || allChecked ? (
                                        <CheckCircle2 size={18} />
                                      ) : (
                                        index + 1
                                      )}
                                    </span>
                                    <span
                                      className={`truncate text-[11px] font-medium ${
                                        isActive
                                          ? 'text-emerald-700'
                                          : 'text-slate-500'
                                      }`}
                                    >
                                      {group}
                                    </span>
                                  </button>

                                  {index < availableGroups.length - 1 && (
                                    <div
                                      className={`mb-5 h-0.5 flex-1 rounded-full ${
                                        index < currentStep
                                          ? 'bg-emerald-400'
                                          : 'bg-slate-200'
                                      }`}
                                    />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>

                        {/* Contenu de l'étape */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Étape {currentStep + 1} / {availableGroups.length}
                              </p>
                              <h4 className="mt-1 text-lg font-bold text-slate-900">
                                {currentGroup}
                              </h4>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={selectAllInGroup}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                              >
                                Tout cocher
                              </button>
                              <button
                                type="button"
                                onClick={deselectAllInGroup}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                              >
                                Tout décocher
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {currentGroupPermissions.map((permission) => {
                              const checked =
                                rolePermissions[selectedRole]?.includes(
                                  permission.key
                                );

                              return (
                                <label
                                  key={permission.key}
                                  className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2.5 transition hover:bg-slate-50"
                                >
                                  <div>
                                    <p className="text-sm font-medium text-slate-800">
                                      {permission.label}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      {permission.key}
                                    </p>
                                  </div>

                                  <span
                                    className={
                                      checked
                                        ? 'flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-white'
                                        : 'flex h-6 w-6 items-center justify-center rounded-md border border-slate-300 bg-slate-100 text-slate-300'
                                    }
                                  >
                                    {checked && <Check size={14} />}
                                  </span>

                                  <input
                                    type="checkbox"
                                    checked={Boolean(checked)}
                                    onChange={() =>
                                      togglePermission(permission.key)
                                    }
                                    className="sr-only"
                                  />
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Navigation */}
                        <div className="mt-5 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={goPrev}
                            disabled={currentStep === 0}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <ChevronLeft size={18} />
                            Précédent
                          </button>

                          <span className="text-sm text-slate-500">
                            {currentStep + 1} sur {availableGroups.length}
                          </span>

                          <button
                            type="button"
                            onClick={goNext}
                            disabled={currentStep === availableGroups.length - 1}
                            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Suivant
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                        Aucune permission ne correspond à votre recherche.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}