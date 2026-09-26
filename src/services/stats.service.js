import api from '@/lib/api'

export const statsService = {
  getOverview: (period = 'month') => api.get(`/stats/overview?period=${period}`),
  getRevenue: (months = 6) => api.get(`/stats/revenue?months=${months}`),
}

export default statsService
