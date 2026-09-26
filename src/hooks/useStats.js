import { useQuery } from '@tanstack/react-query'
import statsService from '@/services/stats.service'

export const statsKeys = {
  all: ['stats'],
  overview: (period) => [...statsKeys.all, 'overview', period],
  revenue: (months) => [...statsKeys.all, 'revenue', months],
}

export function useOverviewStats(period = 'month') {
  return useQuery({
    queryKey: statsKeys.overview(period),
    queryFn: () => statsService.getOverview(period),
  })
}

export function useRevenueStats(months = 6) {
  return useQuery({
    queryKey: statsKeys.revenue(months),
    queryFn: () => statsService.getRevenue(months),
    enabled: months > 0,
  })
}
