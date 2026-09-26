import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineShieldExclamation, HiOutlineArrowLeft } from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';

const AccesRefuse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/60">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
          <HiOutlineShieldExclamation className="h-7 w-7" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight">Accès refusé</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Votre profil <strong className="font-semibold">{role?.label}</strong> ne dispose pas des
          droits requis pour cette page.
        </p>

        {location.state?.permission && (
          <p className="mt-4 inline-block rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            permission requise : {location.state.permission}
          </p>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            Retour
          </button>
          <Link
            to="/"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
          >
            Accueil
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AccesRefuse;
