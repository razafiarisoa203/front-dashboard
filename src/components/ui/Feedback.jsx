import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { cn } from '@/lib/utils'

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
}

export function Spinner({ size = 'md', label, className }) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)} role="status">
      <span
        className={cn(
          'inline-block animate-spin rounded-full border-slate-200 border-t-indigo-600',
          sizes[size],
        )}
      />
      {label && <span className="text-sm text-slate-500">{label}</span>}
      <span className="sr-only">Chargement</span>
    </div>
  )
}

export function ErrorState({ title = 'Une erreur est survenue', onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-rose-200 bg-rose-50/50 p-10 text-center">
      <HiOutlineExclamationTriangle className="text-2xl text-rose-500" />
      <p className="font-medium text-rose-700">{title}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-medium text-rose-600 underline underline-offset-4"
        >
          Réessayer
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title = 'Aucune donnée', description }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
      <p className="font-medium text-slate-700">{title}</p>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    </div>
  )
}
