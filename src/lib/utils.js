import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function capitalize(value = '') {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
