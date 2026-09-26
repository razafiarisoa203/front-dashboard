import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  CircleUserRound,
  MapPinned,
  TrendingUp,
} from 'lucide-react';
import Sidebaradmin from './Sidebaradmin';
import Navbaradmin from './Navbaradmin';

const stats = [
  {
    title: 'Utilisateurs',
    value: '2 480',
    change: '+12.4%',
    icon: CircleUserRound,
    tone: 'emerald',
  },
  {
    title: 'Projets',
    value: '86',
    change: '+8.1%',
    icon: Building2,
    tone: 'sky',
  },
  {
    title: 'Données SIG',
    value: '1 936',
    change: '+5.7%',
    icon: MapPinned,
    tone: 'violet',
  },
  {
    title: 'Performance',
    value: '94%',
    change: '+3.2%',
    icon: TrendingUp,
    tone: 'amber',
  },
];

const chartData = [
  { name: 'Jan', value: 28 },
  { name: 'Fév', value: 35 },
  { name: 'Mar', value: 31 },
  { name: 'Avr', value: 42 },
  { name: 'Mai', value: 48 },
  { name: 'Jui', value: 55 },
  { name: 'Jul', value: 60 },
  { name: 'Aoû', value: 58 },
  { name: 'Sep', value: 68 },
  { name: 'Oct', value: 74 },
  { name: 'Nov', value: 71 },
  { name: 'Déc', value: 82 },
];

const recentActivities = [
  { name: 'Nouveau compte admin', time: 'Il y a 5 min' },
  { name: 'Mise à jour des cartes', time: 'Il y a 22 min' },
  { name: 'Signalement traité', time: 'Il y a 1 h' },
  { name: 'Rapport mensuel généré', time: 'Il y a 2 h' },
];

const toneClasses = {
  emerald: 'bg-emerald-100 text-emerald-700',
  sky: 'bg-sky-100 text-sky-700',
  violet: 'bg-violet-100 text-violet-700',
  amber: 'bg-amber-100 text-amber-700',
};

export default function HeaderDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <Sidebaradmin />

      <div className="flex-1">
        <Navbaradmin />

        <main className="p-4 md:p-5">
          <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div />
          </header>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ title, value, change, icon: Icon, tone }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-2.5 ${toneClasses[tone]}`}>
                    <Icon size={18} />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                    <ArrowUpRight size={12} />
                    {change}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-500">{title}</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">{value}</h2>
              </div>
            ))}
          </section>

          <section className="mt-6 grid gap-4 xl:grid-cols-[1.7fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Activité globale</p>
                  <h3 className="text-lg font-bold text-slate-900">Évolution des indicateurs</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                  <BarChart3 size={14} />
                  2025
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#colorUv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Activité récente</h3>

              <div className="mt-4 space-y-3">
                {recentActivities.map(({ name, time }) => (
                  <div key={name} className="flex items-start gap-3 rounded-xl bg-slate-50 p-2.5">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{name}</p>
                      <p className="text-xs text-slate-500">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
