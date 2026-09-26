import React from 'react';
import { MapPinned, LocateFixed, Layers3, Navigation, Plus } from 'lucide-react';

const zones = [
  { name: 'Zone A', x: '18%', y: '22%', color: 'bg-emerald-500' },
  { name: 'Zone B', x: '42%', y: '35%', color: 'bg-sky-500' },
  { name: 'Zone C', x: '61%', y: '50%', color: 'bg-amber-500' },
  { name: 'Zone D', x: '52%', y: '72%', color: 'bg-violet-500' },
];

const legend = [
  { label: 'Eau', color: 'bg-sky-500' },
  { label: 'Voirie', color: 'bg-amber-500' },
  { label: 'Habitat', color: 'bg-emerald-500' },
  { label: 'Risque', color: 'bg-rose-500' },
];

export default function Carteadmin() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
            Carte du territoire
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">Vue cartographique</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <Layers3 size={16} />
            Couches
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500"
          >
            <Plus size={16} />
            Ajouter
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-50 p-3">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
          <MapPinned size={16} className="text-emerald-600" />
          <span className="text-sm font-medium text-slate-700">Toliara I</span>
        </div>

        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
          <Navigation size={16} className="text-sky-600" />
          <span className="text-sm font-medium text-slate-700">Zoom</span>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),transparent_25%),linear-gradient(135deg,#e2f5ec_0%,#f8fafc_50%,#ecfeff_100%)]">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute left-10 top-12 h-28 w-32 rounded-full border border-emerald-200 bg-emerald-100/80" />
            <div className="absolute right-20 top-20 h-36 w-40 rounded-full border border-sky-200 bg-sky-100/80" />
            <div className="absolute bottom-16 left-1/3 h-28 w-32 rounded-full border border-violet-200 bg-violet-100/80" />
            <div className="absolute bottom-20 right-20 h-24 w-24 rounded-full border border-amber-200 bg-amber-100/80" />
          </div>

          <div className="absolute inset-0">
            <svg viewBox="0 0 800 420" className="h-full w-full opacity-90">
              <path d="M70 120 C150 50, 260 60, 300 150 S420 260, 500 200 S670 100, 760 180 L760 300 C680 290, 620 320, 550 330 S420 380, 330 340 S180 350, 80 270 Z" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 10"/>
              <path d="M120 220 L230 180 L330 240 L470 170 L620 220 L700 260" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 10"/>
              <path d="M200 300 L270 390 L390 340 L510 390 L630 320" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 10"/>
            </svg>
          </div>

          {zones.map((zone) => (
            <div
              key={zone.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: zone.x, top: zone.y }}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${zone.color} text-xs font-bold text-white shadow-lg`}>
                {zone.name.split(' ')[1]}
              </div>
              <p className="mt-2 text-center text-xs font-medium text-slate-700">{zone.name}</p>
            </div>
          ))}

          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
            <LocateFixed size={16} className="text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">12 points actifs</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {legend.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            <span className="text-sm text-slate-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
