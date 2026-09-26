import { HiOutlineChartPie, HiOutlineCog6Tooth, HiOutlineUsers } from 'react-icons/hi2'

export const navigation = [
  { to: '/', label: 'Dashboard', icon: HiOutlineChartPie, end: true },
  { to: '/users', label: 'Utilisateurs', icon: HiOutlineUsers },
  { to: '/settings', label: 'Paramètres', icon: HiOutlineCog6Tooth },
]

export const appName = 'Front Dashboard'
