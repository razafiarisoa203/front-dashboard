import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineSquares2X2,
} from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';
import { site } from '../config/landing';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, role, signOut } = useAuth();

  // Etat initialise depuis le stockage : plus d'effet de synchronisation
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Les ancres ne existent que sur la page d'accueil : depuis une autre
  // route, on y revient d'abord avant de défiler.
  useEffect(() => {
    if (!location.hash) return;
    document
      .getElementById(location.hash.slice(1))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.pathname, location.hash]);

  const projectInitials = site.appName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const goToSection = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const SECTIONS = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'objectif', label: 'Objectif' },
    { id: 'service', label: 'Service' },
  ];

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-800 shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-100 dark:ring-blue-400/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.45),transparent_35%)]" />
            <svg
              viewBox="0 0 64 64"
              className="relative h-7 w-7 text-white"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Logo GeoInfra Toliara"
            >
              <path
                d="M32 54C39.5 45.2 49 38.1 49 27.5C49 18.4 41.2 12 32 12C22.8 12 15 18.4 15 27.5C15 38.1 24.5 45.2 32 54Z"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="27.5" r="7" stroke="currentColor" strokeWidth="3.2" />
              <path d="M21 40H43" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <path
                d="M19 18L25 22M45 18L39 22M19 46L25 42M45 46L39 42"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>
            <span className="absolute bottom-1 right-1 text-[7px] font-black tracking-[0.15em] text-white/90">
              {projectInitials}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
              {site.appName}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-300">{site.tagline}</span>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`/#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                goToSection(section.id);
              }}
              className="text-sm font-medium text-slate-600 transition hover:text-emerald-600 dark:text-slate-200 dark:hover:text-emerald-400"
            >
              {section.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="relative">
            <span className="sr-only">Choisir la langue</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Choisir la langue"
              className="appearance-none rounded-full border border-slate-200 bg-white px-3 py-2 pr-8 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="fr">Français</option>
              <option value="mg">Malagasy</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-300">
              ▾
            </span>
          </label>

          <button
            type="button"
            aria-label="Basculer le mode sombre"
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100 dark:hover:bg-sky-900"
          >
            {darkMode ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span
                title={user?.email}
                className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
              >
                {role?.label}
              </span>

              <Link
                to="/tableau-de-bord"
                className="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 md:inline-flex dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <HiOutlineSquares2X2 className="h-4 w-4" />
                Tableau de bord
              </Link>

              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
              >
                <span className="hidden sm:inline">Déconnexion</span>
                <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              <span>Se connecter</span>
              <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
