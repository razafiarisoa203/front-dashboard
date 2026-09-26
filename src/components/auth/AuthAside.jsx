import {
  HiOutlineCheckCircle,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { site } from '../../config/landing';

const TOLIARA_MAP =
  'https://www.openstreetmap.org/export/embed.html?bbox=43.6100%2C-23.3950%2C43.7300%2C-23.2900&layer=mapnik&marker=-23.3500%2C43.6700';

/* Zones d'analyse affichees en surimpression sur la carte */
const ZONE_MARKERS = [
  { top: '26%', left: '22%', label: 'Analalava' },
  { top: '33%', left: '44%', label: 'Ankaty' },
  { top: '22%', left: '66%', label: 'Tsangaraha' },
  { top: '52%', left: '30%', label: 'Toliara Centre' },
  { top: '64%', left: '58%', label: 'Manambato' },
  { top: '44%', left: '78%', label: 'Fenoarivo Atsinanana' },
];

const MAP_STATS = [
  { value: '12', label: 'Zones analysées' },
  { value: '08', label: 'Réseaux suivis' },
  { value: '18.4k', label: 'Habitants couverts' },
];

const DEFAULT_FEATURES = [
  'Analyses géospatiales avancées',
  'Visualisation de données en temps réel',
  'Rapports automatisés et exports',
];

/**
 * Panneau de gauche des pages d'authentification : carte OSM de Toliara
 * en fond, zones d'analyse en surimpression et statistiques extraites.
 */
export default function AuthAside({ title, description, features = DEFAULT_FEATURES }) {
  return (
    <div className="relative hidden overflow-hidden lg:block">
      <iframe
        title="Carte OpenStreetMap de Toliara"
        src={TOLIARA_MAP}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        scrolling="no"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Voile vert degrade pour la lisibilite du texte */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/85 to-slate-950/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/50" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-rule='nonzero'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Halo lumineux */}
      <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl" />

      {/* Zones d'analyse en surimpression */}
      <div className="absolute inset-0">
        {ZONE_MARKERS.map((zone) => (
          <div key={zone.label} className="absolute" style={{ top: zone.top, left: zone.left }}>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-emerald-200 bg-emerald-500 shadow-lg shadow-emerald-500/40" />
            </span>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-medium tracking-wide text-emerald-200 backdrop-blur">
              {zone.label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <a href="/" className="group flex w-fit items-center gap-2.5 transition hover:gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/30 backdrop-blur-sm transition group-hover:bg-emerald-500/30">
            <HiOutlineMapPin className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">{site.appName}</span>
        </a>

        <div className="max-w-md space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 ring-1 ring-emerald-400/30">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Toliara · Madagascar
            </span>

            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h1>
            <p className="text-base leading-relaxed text-emerald-100/80">{description}</p>
          </div>

          {/* Statistiques extraites de la carte */}
          <div className="grid grid-cols-3 gap-3">
            {MAP_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 backdrop-blur-md transition hover:border-emerald-400/30 hover:bg-white/10"
              >
                <p className="text-lg font-bold text-emerald-300">{stat.value}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-emerald-100/60">{stat.label}</p>
              </div>
            ))}
          </div>

          <ul className="space-y-2.5">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-emerald-100/80">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/25 ring-1 ring-emerald-400/20">
                  <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-emerald-200/60">
            © {new Date().getFullYear()} {site.appName}. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-emerald-300/70">
            <HiOutlineShieldCheck className="h-4 w-4" />
            Connexion chiffrée
          </p>
        </div>
      </div>
    </div>
  );
}
