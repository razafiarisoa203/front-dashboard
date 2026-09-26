import React from 'react';
import { HiOutlineShieldCheck, HiOutlineMapPin } from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';
import { resolvePermissions } from '../roles';
import { site } from '../config/landing';

/**
 * Page d'atterrissage protegee : elle sert de repere au RBAC.
 * A remplacer par les vues metier reelles.
 */
const TableauDeBord = () => {
  const { user, role } = useAuth();
  const permissions = resolvePermissions(role?.id);

  return (
    <main className="bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Espace sécurisé
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Tableau de bord</h1>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <HiOutlineShieldCheck className="h-4 w-4" />
            {role?.label}
          </span>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <HiOutlineMapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Session ouverte</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {user?.email} · {role?.description}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-semibold">Permissions accordées</h2>
            <span className="text-sm tabular-nums text-slate-500 dark:text-slate-400">
              {permissions.length}
            </span>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2">
            {permissions.map((permission) => (
              <li
                key={permission}
                className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {permission}
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Emplacement de référence pour {site.appName} : les routes protégées s'y grefferont via{' '}
          <code className="font-mono text-slate-600 dark:text-slate-300">
            &lt;ProtectedRoute permission=…&gt;
          </code>
          .
        </p>
      </div>
    </main>
  );
};

export default TableauDeBord;
