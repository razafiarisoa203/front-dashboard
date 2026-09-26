import React from 'react';
import {
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMap,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineCursorArrowRays,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { hero, dashboard, site } from '../config/landing';

const Accueil = () => {
  const processSteps = [
    {
      step: '01',
      title: 'Collecte des données',
      description:
        'Agrégation automatique des informations urbaines, réseaux et infrastructures depuis vos sources existantes.',
      icon: HiOutlineGlobeAlt,
    },
    {
      step: '02',
      title: 'Visualisation cartographique',
      description:
        'Affichage clair et interactif des zones, couverture et priorités sur une carte unique.',
      icon: HiOutlineMapPin,
    },
    {
      step: '03',
      title: 'Aide à la décision',
      description:
        'Indicateurs clés et priorisation des interventions pour agir plus vite et plus juste.',
      icon: HiOutlineChartBar,
    },
  ];

  const benefits = [
    {
      title: 'Décisions plus rapides',
      description: 'Tous les indicateurs essentiels réunis au même endroit.',
      icon: HiOutlineSparkles,
    },
    {
      title: 'Vision partagée',
      description: 'Une carte unique pour les équipes techniques et les décideurs.',
      icon: HiOutlineUsers,
    },
    {
      title: 'Données fiables',
      description: 'Suivi en temps réel de la couverture et des interventions.',
      icon: HiOutlineShieldCheck,
    },
    {
      title: 'Priorisation claire',
      description: 'Identifiez facilement les zones à traiter en priorité.',
      icon: HiOutlineCursorArrowRays,
    },
  ];

  return (
    <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Hero */}
      <section id="accueil" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_right,_rgba(14,165,233,0.1),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.4))] dark:bg-[linear-gradient(to_bottom,transparent,rgba(2,6,23,0.6))]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          {/* Colonne texte */}
          <div className="order-2 lg:order-1">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Bienvenue
            </p>

            <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1] dark:text-white">
              {hero.title}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {hero.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 hover:shadow-emerald-500/30"
              >
                {hero.primaryCta.label}
                <HiOutlineArrowRight className="h-4 w-4" />
              </a>

              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
              >
                {hero.secondaryCta.label}
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200/80 pt-8 dark:border-slate-800">
              {[
                { value: '12', label: 'Zones' },
                { value: '08', label: 'Réseaux' },
                { value: '18.4k', label: 'Habitants' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Carte dashboard — uniquement la carte OSM */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-400/25 via-transparent to-sky-400/15 blur-2xl" />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/60">
                {/* Barre de titre */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-950/80">
                  Carte interactive de Toliara
                </div>

                {/* Carte OSM plein espace */}
                <div className="relative">
                  <iframe
                    title="Carte OpenStreetMap de Toliara"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=43.6200%2C-23.3800%2C43.7200%2C-23.3000&layer=mapnik&marker=-23.3500%2C43.6700"
                    className="h-64 w-full border-0 sm:h-72 lg:h-80"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-slate-200 bg-slate-50/80 py-10 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hero.highlights.map(({ label, value, description, icon: Icon }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {label}
                  </p>
                  <p className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">{value}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectif */}
      <section id="objectif" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Objectif
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Un tableau de bord pensé pour la décision
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Trois piliers pour transformer les données urbaines en actions concrètes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            'Centraliser les données urbaines',
            'Visualiser les infrastructures sur une carte interactive',
            'Aider à la priorisation des interventions',
          ].map((item, index) => (
            <div
              key={item}
              className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:from-slate-900 dark:to-slate-950"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl transition group-hover:bg-emerald-300/40 dark:bg-emerald-900/30" />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100 dark:bg-slate-950 dark:text-emerald-300 dark:ring-slate-700">
                  <HiOutlineCheckCircle className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-bold leading-snug text-slate-900 dark:text-white">
                  {item}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment" className="bg-slate-50 py-20 dark:bg-slate-900/50 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Processus
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Comment ça marche
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Un parcours simple, de la donnée brute à la décision éclairée.
            </p>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent md:block dark:via-emerald-800" />

            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {processSteps.map(({ step, title, description, icon: Icon }) => (
                <div key={step} className="relative text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-emerald-200 bg-white text-emerald-700 shadow-md dark:border-emerald-800 dark:bg-slate-950 dark:text-emerald-300">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold tracking-wider text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                    {step}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="service" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Des fonctionnalités utiles pour les décideurs
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Tout ce qu’il faut pour piloter la cartographie urbaine au quotidien.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dashboard.features.slice(0, 6).map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-900"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:scale-105 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900/40 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Avantages
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Pourquoi choisir {site.appName} ?
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      
      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <HiOutlineMapPin className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {site.appName}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Plateforme de cartographie urbaine pour centraliser les données et faciliter
                la prise de décision.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600">
                Navigation
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  { href: '#accueil', label: 'Accueil' },
                  { href: '#objectif', label: 'Objectif' },
                  { href: '#comment', label: 'Comment ça marche' },
                  { href: '#service', label: 'Services' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600">
                Contact
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <HiOutlineEnvelope className="h-4 w-4 shrink-0 text-emerald-600" />
                  <a
                    href="mailto:contact@example.com"
                    className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    contact@example.com
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <HiOutlinePhone className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>+33 1 23 45 67 89</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <HiOutlineMap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Toliara, Madagascar</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600">
                Légal
              </h3>
              <ul className="mt-4 space-y-3">
                {['Mentions légales', 'Politique de confidentialité', "Conditions d'utilisation"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 sm:flex-row">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} {site.appName}. Tous droits réservés.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Conçu pour les décideurs urbains
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Accueil;