import { HiOutlineCheckCircle } from 'react-icons/hi2';

/**
 * Sequence d'authentification : etapes durables + barre de progression.
 */
export default function AuthSequence({ steps, current }) {
  const finished = current >= steps.length;
  const progress = finished ? 100 : (current / steps.length) * 100;

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-emerald-200/80 bg-emerald-50/70 px-3.5 py-3 animate-fade-in-down dark:border-emerald-900/50 dark:bg-emerald-950/30">
      <ul className="space-y-1.5">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current && !finished;

          return (
            <li key={step.label} className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {done ? (
                  <HiOutlineCheckCircle className="h-5 w-5 text-emerald-500" />
                ) : active ? (
                  <svg className="h-4 w-4 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-80"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                )}
              </span>
              <span
                className={`text-sm transition-colors ${
                  done
                    ? 'text-slate-400 line-through dark:text-slate-600'
                    : active
                      ? 'font-semibold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-400 dark:text-slate-600'
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
