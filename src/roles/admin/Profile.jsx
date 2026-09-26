import React from 'react';
import {
  Bell,
  CalendarDays,
  Camera,
  Check,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react';
import Sidebaradmin from './Sidebaradmin';
import Navbaradmin from './Navbaradmin';

const stats = [
  { label: 'Projets', value: '-' },
  { label: 'Tâches', value: '-' },
  { label: 'Équipe', value: '-' },
];

const activity = [
  { title: 'Aucune activité récente', time: '---' },
];

function Profile() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <Sidebaradmin />

      <div className="flex-1">
        <Navbaradmin />

        <main className="p-4 md:p-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex flex-col gap-6 xl:flex-row">
              <aside className="w-full xl:max-w-sm">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="relative mx-auto h-28 w-28">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-3xl font-bold text-white shadow-lg shadow-emerald-500/30">
                      --
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white shadow-sm"
                      aria-label="Changer la photo"
                    >
                      <Camera size={16} />
                    </button>
                  </div>

                  <div className="mt-5 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">--</h2>
                    <p className="mt-1 text-sm text-emerald-600">--</p>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {stats.map(({ label, value }) => (
                      <div key={label} className="rounded-2xl bg-white p-3 text-center shadow-sm">
                        <p className="text-xl font-bold text-slate-900">{value}</p>
                        <p className="mt-1 text-[11px] text-slate-500">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Mail size={16} className="text-emerald-600" />
                      <span>--</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Phone size={16} className="text-emerald-600" />
                      <span>--</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <MapPin size={16} className="text-emerald-600" />
                      <span>--</span>
                    </div>
                  </div>
                </div>
              </aside>

              <section className="flex-1 space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
                      Profil
                    </p>
                    <h3 className="mt-1 text-3xl font-bold text-slate-900">Informations personnelles</h3>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-500"
                  >
                    <Pencil size={16} />
                    Modifier le profil
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Nom complet
                    </label>
                    <p className="mt-2 text-lg font-semibold text-slate-900">--</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Poste
                    </label>
                    <p className="mt-2 text-lg font-semibold text-slate-900">--</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Département
                    </label>
                    <p className="mt-2 text-lg font-semibold text-slate-900">--</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Date d’entrée
                    </label>
                    <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-slate-900">
                      <CalendarDays size={16} className="text-emerald-600" />
                      --
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-slate-900">Sécurité</h4>
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                        <ShieldCheck size={14} />
                        --
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                        <span className="text-sm text-slate-600">Authentification à deux facteurs</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                          <Check size={12} />
                          --
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                        <span className="text-sm text-slate-600">Mise à jour de mot de passe</span>
                        <span className="text-sm font-medium text-slate-800">--</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-900">Activité récente</h4>

                    <div className="mt-4 space-y-3">
                      {activity.map(({ title, time }) => (
                        <div key={title} className="rounded-xl bg-slate-50 p-3">
                          <p className="text-sm font-medium text-slate-800">{title}</p>
                          <p className="mt-1 text-xs text-slate-500">{time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
