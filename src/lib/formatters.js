const numberFormatter = new Intl.NumberFormat('fr-FR')
const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})
const compactFormatter = new Intl.NumberFormat('fr-FR', {
  notation: 'compact',
  maximumFractionDigits: 1,
})
const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'medium',
})

export const formatNumber = (value) => numberFormatter.format(value ?? 0)
export const formatCurrency = (value) => currencyFormatter.format(value ?? 0)
export const formatCompact = (value) => compactFormatter.format(value ?? 0)
export const formatDate = (value) => dateFormatter.format(new Date(value))

export function formatPercent(value, digits = 1) {
  return `${Number(value ?? 0).toFixed(digits).replace('.', ',')} %`
}
