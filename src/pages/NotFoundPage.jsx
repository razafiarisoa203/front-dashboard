import { buttonStyles } from '@/components/ui/buttonStyles'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
      <p className="text-6xl font-bold text-indigo-600">404</p>
      <h1 className="text-xl font-semibold text-slate-900">Page introuvable</h1>
      <p className="text-slate-500">
        L'URL demandée n'existe pas ou a été déplacée.
      </p>
      <a href="/" className={buttonStyles()}>
        Retour à l'accueil
      </a>
    </div>
  )
}
