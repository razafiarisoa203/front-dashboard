import { useState } from 'react'
import { toast } from 'sonner'
import PageHeader from '@/components/ui/PageHeader'
import Button from '@/components/ui/Button'
import { Input } from '@/components/forms/Input'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

function Toggle({ label, description, defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="flex items-start justify-between gap-6 py-3">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {description && (
          <p className="text-xs text-slate-500">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => setChecked((value) => !value)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? 'bg-indigo-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? 'left-5.5' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  function handleSave(event) {
    event.preventDefault()
    toast.success('Paramètres enregistrés')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Paramètres"
        description="Configurez les préférences de votre compte."
      />

      <form onSubmit={handleSave} className="max-w-2xl space-y-5">
        <Card>
          <CardHeader
            title="Profil"
            description="Ces informations sont visibles par votre équipe."
          />
          <CardBody className="grid gap-4 sm:grid-cols-2">
            <Input label="Prénom" defaultValue="Camille" />
            <Input label="Nom" defaultValue="Dupont" />
            <Input label="Email" type="email" defaultValue="camille@example.com" />
            <Input label="Téléphone" defaultValue="+33 6 12 34 56 78" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Préférences"
            description="Personnalisez votre expérience au quotidien."
          />
          <CardBody className="divide-y divide-slate-100">
            <Toggle
              label="Notifications par email"
              description="Recevoir un résumé quotidien de l'activité."
              defaultChecked
            />
            <Toggle
              label="Mode sombre"
              description="Appliquer le thème sombre à l'interface."
            />
            <Toggle
              label="Rapports hebdomadaires"
              description="Envoyer les rapports chaque lundi matin."
            />
          </CardBody>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button">
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </div>
  )
}
