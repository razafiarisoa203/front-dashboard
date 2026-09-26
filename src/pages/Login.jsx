import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';
import { toast } from 'sonner';
import AuthSequence from '../components/auth/AuthSequence';
import { useAuthSequence } from '../hooks/useAuthSequence';
import { useAuth } from '../hooks/useAuth';
import { site } from '../config/landing';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AUTH_STEPS = [
  { label: 'Ouverture de la session sécurisée', duration: 700 },
  { label: 'Vérification de vos identifiants', duration: 900 },
  { label: 'Chargement de votre espace', duration: 800 },
];

const MAP_STATS = [
  { value: '12', label: 'Zones analysées' },
  { value: '08', label: 'Réseaux suivis' },
  { value: '18.4k', label: 'Habitants couverts' },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Validee derivee pendant le rendu, pas via un effet
  const emailValid = EMAIL_REGEX.test(email);

  const { active, current, start } = useAuthSequence(AUTH_STEPS, {
    onSuccess: () => {
      signIn({ email });
      setEmail('');
      setPassword('');
      setError('');
      toast.success('Connexion réussie', {
        description: `Bienvenue sur l'espace ${site.appName}.`,
      });
      navigate(location.state?.from ?? '/header-dashboard', { replace: true });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!emailValid) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    start();
  };

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 p-4 text-slate-900 sm:p-6 dark:from-emerald-950/40 dark:via-slate-950 dark:to-slate-900">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/60">
        {/* Panneau gauche — sans carte ni noms de villes */}
        <div className="relative hidden overflow-hidden lg:block">
          {/* Fond dégradé */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950" />

          {/* Texture subtile */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-rule='nonzero'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Halos lumineux */}
          <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl" />

          {/* Contenu texte */}
          <div className="relative z-10 flex h-full flex-col justify-between p-8">
            {/* Logo + nom */}
            <a href="/" className="group flex w-fit items-center gap-2.5 transition hover:gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/30 backdrop-blur-sm transition group-hover:bg-emerald-500/30">
                <HiOutlineMapPin className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">{site.appName}</span>
            </a>

            {/* Bloc principal */}
            <div className="max-w-md space-y-6">
              {/* Badge "Toliara · Madagascar" */}
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 ring-1 ring-emerald-400/30">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Toliara · Madagascar
              </span>

              {/* Titre + description */}
              <div className="space-y-4">
                <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Cartographie urbaine pour une meilleure décision
                </h1>
                <p className="text-base leading-relaxed text-emerald-100/80">
                  Connectez-vous pour accéder au tableau de bord et piloter vos données urbaines
                  en temps réel.
                </p>
              </div>

              {/* Statistiques */}
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

              {/* Features */}
              <ul className="space-y-2.5">
                {[
                  'Analyses géospatiales avancées',
                  'Visualisation de données en temps réel',
                  'Rapports automatisés et exports',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-emerald-100/80">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/25 ring-1 ring-emerald-400/20">
                      <HiOutlineCheckCircle className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
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

        {/* Panneau droit — formulaire */}
        <div className="flex items-center px-7 py-7 sm:px-10">
          <div className="m-auto w-full max-w-sm">
            {/* Logo mobile */}
            <a href="/" className="group mb-6 flex items-center gap-2.5 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25">
                <HiOutlineMapPin className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {site.appName}
              </span>
            </a>

            <div className="space-y-1.5 animate-rise">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Bon retour
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Entrez vos identifiants pour accéder à votre espace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 animate-fade-in-down dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                  <HiOutlineExclamationCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Adresse e-mail */}
              <div className="space-y-1.5 animate-fade-in-left" style={{ animationDelay: '60ms' }}>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Adresse e-mail
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <HiOutlineEnvelope
                      className={`h-5 w-5 transition-colors duration-200 ${
                        emailTouched && emailValid ? 'text-emerald-500' : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="vous@exemple.com"
                    aria-invalid={emailTouched && !emailValid}
                    aria-describedby={emailTouched && !emailValid ? 'email-error' : undefined}
                    className={`w-full rounded-xl border bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
                      emailTouched && !emailValid
                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-red-800'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700'
                    }`}
                  />
                  {emailTouched && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                      {emailValid ? (
                        <HiOutlineCheckCircle className="h-5 w-5 text-emerald-500 animate-fade-in" />
                      ) : email.length > 0 ? (
                        <HiOutlineExclamationCircle className="h-5 w-5 text-amber-500 animate-fade-in" />
                      ) : null}
                    </div>
                  )}
                </div>
                {emailTouched && !emailValid && email.length > 0 && (
                  <p
                    id="email-error"
                    className="text-xs text-red-600 animate-fade-in-down dark:text-red-400"
                  >
                    Veuillez entrer une adresse e-mail valide.
                  </p>
                )}
              </div>

              {/* Mot de passe */}
              <div className="space-y-1.5 animate-fade-in-left" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Mot de passe
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-emerald-600 transition hover:text-emerald-500 hover:underline dark:text-emerald-400"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <HiOutlineLockClosed
                      className={`h-5 w-5 transition-colors duration-200 ${
                        passwordFocused ? 'text-emerald-500' : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-12 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <HiOutlineEyeSlash className="h-5 w-5" />
                    ) : (
                      <HiOutlineEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Se souvenir de moi */}
              <div className="flex items-center animate-fade-in-left" style={{ animationDelay: '180ms' }}>
                <label htmlFor="remember" className="flex cursor-pointer items-center gap-2.5">
                  <div className="relative">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="peer h-4.5 w-4.5 cursor-pointer appearance-none rounded border-2 border-slate-300 bg-white transition-all checked:border-emerald-500 checked:bg-emerald-500 hover:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-900"
                    />
                    <HiOutlineCheckCircle className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                  </div>
                  <span className="text-sm text-slate-600 transition dark:text-slate-400">
                    Se souvenir de moi pendant 30 jours
                  </span>
                </label>
              </div>

              {/* Soumission + Annuler */}
              <div className="animate-fade-in-left" style={{ animationDelay: '240ms' }}>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300
                      hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md
                      focus:outline-none focus:ring-4 focus:ring-slate-500/10
                      dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300
                      dark:hover:border-slate-600 dark:hover:bg-slate-800
                      sm:w-auto sm:min-w-[120px]"
                  >
                    Annuler
                  </a>

                  <button
                    type="submit"
                    disabled={active}
                    className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300
                      hover:from-emerald-500 hover:to-emerald-400
                      hover:shadow-xl hover:shadow-emerald-500/30
                      hover:-translate-y-0.5
                      focus:outline-none focus:ring-4 focus:ring-emerald-500/30
                      disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0
                      sm:flex-1"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />

                    {active ? (
                      <span className="flex items-center gap-2.5">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span>Connexion...</span>
                      </span>
                    ) : (
                      <>
                        <span>Se connecter</span>
                        <HiOutlineArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {active && <AuthSequence steps={AUTH_STEPS} current={current} />}
              </div>
            </form>

            {/* Séparateur */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-slate-400 dark:bg-slate-900 dark:text-slate-500">
                  Ou continuer avec
                </span>
              </div>
            </div>

            {/* Connexion tierce */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="group flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:bg-slate-800"
              >
                <svg className="h-5 w-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="group flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:bg-slate-800"
              >
                <svg
                  className="h-5 w-5 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Pas encore de compte ?{' '}
              <a
                href="/register"
                className="group inline-flex items-center font-semibold text-emerald-600 transition hover:text-emerald-500 hover:underline dark:text-emerald-400"
              >
                Créer un compte
                <HiOutlineArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;