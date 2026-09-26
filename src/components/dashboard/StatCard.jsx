import { cn } from '@/lib/utils'
import { formatCompact } from '@/lib/formatters'

export default function StatCard({ label, value, icon: Icon, trend }) {
  const isUp = (trend ?? 0) >= 0

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {Icon && <Icon className="text-xl text-indigo-500" />}
      </div>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {formatCompact(value)}
      </p>

      {trend !== undefined && (
        <p
          className={cn(
            'mt-1 text-xs font-medium',
            isUp ? 'text-emerald-600' : 'text-rose-600',
          )}
        >
          {isUp ? '+' : ''}
          {trend}% vs mois dernier
        </p>
      )}
    </div>
  )
}
