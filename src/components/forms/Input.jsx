import { useId } from 'react'
import { cn } from '@/lib/utils'
import { inputBaseClass } from './Field'

export function Input({ label, error, hint, className, id, ...props }) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="space-y-1.5 text-sm font-medium text-slate-700">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        className={cn(
          inputBaseClass,
          error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-100',
          className,
        )}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
      {error ? (
        <p className="text-xs font-medium text-rose-600">{error}</p>
      ) : (
        hint && <p className="text-xs text-slate-400">{hint}</p>
      )}
    </div>
  )
}

export function Select({ label, error, options = [], className, id, ...props }) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className="space-y-1.5 text-sm font-medium text-slate-700">
      {label && <label htmlFor={selectId}>{label}</label>}
      <select id={selectId} className={cn(inputBaseClass, className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
    </div>
  )
}
