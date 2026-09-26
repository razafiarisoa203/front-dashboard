import { cn } from '@/lib/utils'

export const inputBaseClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ' +
  'outline-none transition placeholder:text-slate-400 ' +
  'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ' +
  'disabled:cursor-not-allowed disabled:bg-slate-50'

const fieldClass = 'block space-y-1.5 text-sm font-medium text-slate-700'

export function Field({ label, htmlFor, error, hint, children, className }) {
  return (
    <div className={cn(fieldClass, className)}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
      {error ? (
        <p className="text-xs font-medium text-rose-600">{error}</p>
      ) : (
        hint && <p className="text-xs text-slate-400">{hint}</p>
      )}
    </div>
  )
}
