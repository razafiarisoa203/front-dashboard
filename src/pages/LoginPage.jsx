import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useState } from 'react'
import { appName } from '@/config/navigation'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema } from '@/lib/validation/schemas'
import { Input } from '@/components/forms/Input'
import Button from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Feedback'
import authService from '@/services/auth.service'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useAuth()
  const [isSubmittingDemo, setSubmittingDemo] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  })

  async function onSubmit(values) {
    try {
      const user = await authService.login(values)
      setUser(user)
      toast.success('Connexion réussie')
      navigate(location.state?.from?.pathname ?? '/', { replace: true })
    } catch (error) {
      toast.error(error.message ?? 'Identifiants incorrects')
    }
  }

  function fillDemo() {
    setValue('email', 'demo@example.com', { shouldValidate: true })
    setValue('password', 'password123', { shouldValidate: true })
  }

  async function loginAsDemo() {
    setSubmittingDemo(true)
    setUser({ firstName: 'Demo', role: 'Administrateur', email: 'demo@example.com' })
    toast.success('Mode démonstration')
    navigate('/', { replace: true })
    setSubmittingDemo(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">{appName}</h1>
          <p className="text-sm text-slate-500">Connectez-vous à votre compte</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl bg-white p-8 shadow-sm"
        >
          <Input
            label="Email"
            type="email"
            placeholder="vous@exemple.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 accent-indigo-600"
              {...register('remember')}
            />
            Se souvenir de moi
          </label>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isSubmittingDemo}
          >
            {isSubmitting ? 'Connexion…' : 'Se connecter'}
          </Button>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            ou
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <Button
            variant="secondary"
            className="w-full"
            onClick={fillDemo}
            type="button"
          >
            Remplir les identifiants démo
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={loginAsDemo}
            disabled={isSubmittingDemo}
            type="button"
          >
            {isSubmittingDemo ? <Spinner size="sm" /> : 'Entrer sans compte'}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          Besoin d'aide ?{' '}
          <Link to="/" className="underline underline-offset-2">
            Retour à l'accueil
          </Link>
        </p>
      </div>
    </div>
  )
}
