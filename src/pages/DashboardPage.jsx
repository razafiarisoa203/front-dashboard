import { lazy, Suspense, useState } from 'react'
import {
  HiArrowTrendingUp,
  HiOutlineBanknotes,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import PageHeader from '@/components/ui/PageHeader'
import { ErrorState, Spinner } from '@/components/ui/Feedback'
import StatCard from '@/components/dashboard/StatCard'
import { Select } from '@/components/forms/Input'
import { useDebounce } from '@/hooks/useDebounce'
import { useOverviewStats, useRevenueStats } from '@/hooks/useStats'
import { formatNumber } from '@/lib/formatters'

const RevenueChart = lazy(() => import('@/components/dashboard/RevenueChart'))

const fallbackStats = [
  { label: 'Utilisateurs', value: 12480, icon: HiOutlineUserGroup, trend: 12 },
  { label: 'Revenus', value: 45230, icon: HiOutlineBanknotes, trend: -4 },
  { label: 'Sessions', value: 3187, icon: HiArrowTrendingUp, trend: 8 },
]

const periodOptions = [
  { value: 'week', label: '7 derniers jours' },
  { value: 'month', label: '30 derniers jours' },
  { value: 'quarter', label: '3 derniers mois' },
]

export default function DashboardPage() {
  const [period, setPeriod] = useState('month')
  const debouncedPeriod = useDebounce(period)

  const overview = useOverviewStats(debouncedPeriod)
  const revenue = useRevenueStats(6)

  const stats = overview.data?.stats ?? fallbackStats

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vue d'ensemble"
        description="Les principaux indicateurs de votre activité."
        actions={
          <Select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            options={periodOptions}
            className="w-52"
          />
        }
      />

      {overview.isError ? (
        <ErrorState
          title="Impossible de charger les statistiques"
          onRetry={overview.refetch}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {overview.isLoading
            ? Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-xl bg-white"
                />
              ))
            : stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>
      )}

      <Suspense
        fallback={
          <div className="flex h-80 items-center justify-center rounded-xl border border-slate-200 bg-white">
            <Spinner label="Chargement du graphique" />
          </div>
        }
      >
        <RevenueChart
          data={revenue.data ?? []}
          isLoading={revenue.isLoading}
        />
      </Suspense>

      {overview.data?.lastSync && (
        <p className="text-xs text-slate-400">
          Dernière synchronisation :{' '}
          {new Date(overview.data.lastSync).toLocaleString('fr-FR')} (
          {formatNumber(overview.data.count ?? 0)} enregistrements)
        </p>
      )}
    </div>
  )
}
