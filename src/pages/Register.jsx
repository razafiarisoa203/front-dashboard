import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineMapPin,
  HiOutlineUser,
  HiOutlineIdentification,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
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
import { site } from '../config/landing';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* Formats malgaches : 034 12 345 67, +261 34 12 345 67, 0341234567 */
const PHONE_REGEX = /^(?:\+261|0)\s?[2-9]\d{1}\s?[\d\s.-]{6,9}$/;

const REGISTER_STEPS = [
  { label: 'Vérification du numéro de téléphone', duration: 800 },
  { label: 'Création de votre compte', duration: 900 },
  { label: 'Initialisation de votre espace', duration: 800 },
];

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirm: '',
};

const MAP_STATS = [
  { value: '12', label: 'Zones analysées' },
  { value: '08', label: 'Réseaux suivis' },
  { value: '18.4k', label: 'Habitants couverts' },
];

/* Les regles sont derivees pendant le rendu : aucun effet, pas de rendu en cascade */
function validate(values) {
  return {
    firstName: values.firstName.trim().length >= 2 ? '' : 'Au moins 2 caractères.',
    lastName: values.lastName.trim().length >= 2 ? '' : 'Au moins 2 caractères.',
    email: EMAIL_REGEX.test(values.email) ? '' : 'Adresse e-mail invalide.',
    phone: PHONE_REGEX.test(values.phone.replace(/\s/g, '')) ? '' : 'Format attendu : 034 12 345 67.',
    password: values.password.length >= 8 ? '' : '8 caractères minimum.',
    confirm:
      values.confirm && values.confirm === values.password ? '' : 'Les mots de passe ne correspondent pas.',
  };
}

function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  autoComplete,
  inputMode,
  icon: Icon,
  error,
  touched,
  delay = 0,
  right,
}) {
  const showError = touched && error;
  const isValid = touched && !error && value.length > 0;

  return (
    <div className="space-y-1.5 animate-fade-in-left" style={{ animationDelay: delay }}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon
              className={`h-5 w-5 transition-colors duration-200 ${
                isValid ? 'text-emerald-500' : 'text-slate-400'
              }`}
            />
          </div>
        )}
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={!!showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-white py-2.5 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
            Icon ? 'pl-11' : 'pl-4'
          } ${
            showError
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-red-800'
              : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700'
          }`}
        />
        {right}
        {isValid && !right && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
            <HiOutlineCheckCircle className="h-5 w-5 text-emerald-500 animate-fade-in" />
          </div>
        )}
      </div>
      {showError && (
        <p id={`${id}-error`} className="text-xs text-red-600 animate-fade-in-down dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [visible, setVisible] = useState({ password: false, confirm: false });
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const errors = validate(values);

  const { active, current, start } = useAuthSequence(REGISTER_STEPS, {
    onSuccess: () => {
      toast.success('Compte créé', {
        description: 'Vous pouvez maintenant vous connecter à votre espace.',
      });
      navigate('/login');
    },
  });

  const handleChange = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));
  const handleBlur = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched(Object.fromEntries(Object.keys(EMPTY_FORM).map((key) => [key, true])));

    const firstError = Object.keys(errors).find((key) => errors[key] !== '');
    if (firstError) {
      setError('Certains champs sont invalides. Vérifiez le formulaire.');
      return;
    }
    if (!accepted) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    setError('');
    start();
  };

  /* Bouton oeil pour les deux champs mot de passe */
  const eyeButton = (name) => (
    <button
      type="button"
      onClick={() => setVisible((v) => ({ ...v, [name]: !v[name] }))}
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
      aria-label={visible[name] ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
      tabIndex={-1}
    >
      {visible[name] ? <HiOutlineEyeSlash className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
    </button>
  );

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
                  Créez votre accès au tableau de bord
                </h1>
                <p className="text-base leading-relaxed text-emerald-100/80">
                  Renseignez votre identité et votre numéro : vous accéderez à vos couches
                  d'infrastructure en quelques secondes.
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
                  'Accès aux couches géospatiales',
                  "Suivi de vos zones d'analyse",
                  'Exports et rapports automatisés',
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
        <div className="flex items-center px-7 py-6 sm:px-10">
          <div className="m-auto w-full max-w-sm">
            {/* Logo mobile */}
            <a href="/" className="group mb-5 flex items-center gap-2.5 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25">
                <HiOutlineMapPin className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {site.appName}
              </span>
            </a>

            <div className="space-y-1 animate-rise">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Créer un compte
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Les champs marqués sont obligatoires.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 animate-fade-in-down dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                  <HiOutlineExclamationCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Prénom et nom */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field
                  id="firstName"
                  label="Prénom"
                  icon={HiOutlineUser}
                  autoComplete="given-name"
                  placeholder="Andrianina"
                  value={values.firstName}
                  onChange={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  error={errors.firstName}
                  touched={submitted || !!touched.firstName}
                  delay="40ms"
                />
                <Field
                  id="lastName"
                  label="Nom"
                  icon={HiOutlineIdentification}
                  autoComplete="family-name"
                  placeholder="Rakoto"
                  value={values.lastName}
                  onChange={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  error={errors.lastName}
                  touched={submitted || !!touched.lastName}
                  delay="80ms"
                />
              </div>

              {/* E-mail et téléphone */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field
                  id="email"
                  label="Adresse e-mail"
                  icon={HiOutlineEnvelope}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="vous@exemple.com"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={submitted || !!touched.email}
                  delay="120ms"
                />
                <Field
                  id="phone"
                  label="Téléphone"
                  icon={HiOutlineDevicePhoneMobile}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="034 12 345 67"
                  value={values.phone}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={errors.phone}
                  touched={submitted || !!touched.phone}
                  delay="160ms"
                />
              </div>

              {/* Mot de passe */}
              <Field
                id="password"
                label="Mot de passe"
                type={visible.password ? 'text' : 'password'}
                icon={HiOutlineLockClosed}
                autoComplete="new-password"
                placeholder="8 caractères minimum"
                value={values.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={submitted || !!touched.password}
                delay="200ms"
                right={
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    {eyeButton('password')}
                  </div>
                }
              />

              {/* Confirmation */}
              <Field
                id="confirm"
                label="Confirmer le mot de passe"
                type={visible.confirm ? 'text' : 'password'}
                icon={HiOutlineLockClosed}
                autoComplete="new-password"
                placeholder="••••••••"
                value={values.confirm}
                onChange={handleChange('confirm')}
                onBlur={handleBlur('confirm')}
                error={errors.confirm}
                touched={submitted || !!touched.confirm}
                delay="240ms"
                right={
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    {eyeButton('confirm')}
                  </div>
                }
              />

              {touched.confirm && !errors.confirm && values.confirm.length > 0 && (
                <p className="-mt-1 flex items-center gap-1.5 text-xs text-emerald-600 animate-fade-in-down dark:text-emerald-400">
                  <HiOutlineCheckCircle className="h-4 w-4" />
                  Les mots de passe correspondent
                </p>
              )}

              {/* Conditions */}
              <label htmlFor="cgu" className="flex cursor-pointer items-start gap-2.5 pt-0.5">
                <div className="relative mt-0.5">
                  <input
                    id="cgu"
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="peer h-4.5 w-4.5 cursor-pointer appearance-none rounded border-2 border-slate-300 bg-white transition-all checked:border-emerald-500 checked:bg-emerald-500 hover:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-900"
                  />
                  <HiOutlineCheckCircle className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                </div>
                <span className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  J'accepte les conditions d'utilisation et la politique de confidentialité de{' '}
                  {site.appName}.
                </span>
              </label>

              {/* Soumission */}
              <div className="animate-fade-in-left" style={{ animationDelay: '280ms' }}>
                <button
                  type="submit"
                  disabled={active}
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300
                    hover:from-emerald-500 hover:to-emerald-400
                    hover:shadow-xl hover:shadow-emerald-500/30
                    hover:-translate-y-0.5
                    focus:outline-none focus:ring-4 focus:ring-emerald-500/30
                    disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
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
                      <span>Création...</span>
                    </span>
                  ) : (
                    <>
                      <span>Créer mon compte</span>
                      <HiOutlineArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {active && <AuthSequence steps={REGISTER_STEPS} current={current} />}
              </div>
            </form>

            <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
              Déjà un compte ?{' '}
              <a
                href="/login"
                className="group inline-flex items-center font-semibold text-emerald-600 transition hover:text-emerald-500 hover:underline dark:text-emerald-400"
              >
                Se connecter
                <HiOutlineArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;