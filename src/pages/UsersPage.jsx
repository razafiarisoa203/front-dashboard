import { useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Input, Select } from '@/components/forms/Input'
import { Card, CardBody } from '@/components/ui/Card'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/Table'
import { EmptyState } from '@/components/ui/Feedback'
import { useDebounce } from '@/hooks/useDebounce'
import { formatDate, formatNumber } from '@/lib/formatters'

const users = [
  { id: 1, name: 'Camille Dupont', email: 'camille@example.com', role: 'Admin', status: 'active', joinedAt: '2025-11-04' },
  { id: 2, name: 'Yanis Moreau', email: 'yanis@example.com', role: 'Éditeur', status: 'active', joinedAt: '2025-12-18' },
  { id: 3, name: 'Léa Bernard', email: 'lea@example.com', role: 'Lecteur', status: 'pending', joinedAt: '2026-01-22' },
  { id: 4, name: 'Hugo Petit', email: 'hugo@example.com', role: 'Lecteur', status: 'inactive', joinedAt: '2026-02-09' },
]

const statusTone = { active: 'success', pending: 'warning', inactive: 'neutral' }
const statusLabel = { active: 'Actif', pending: 'En attente', inactive: 'Inactif' }

const roleOptions = [
  { value: 'all', label: 'Tous les rôles' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Éditeur', label: 'Éditeur' },
  { value: 'Lecteur', label: 'Lecteur' },
]

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('all')
  const debouncedSearch = useDebounce(search)

  const filtered = users.filter((user) => {
    const matchesSearch = `${user.name} ${user.email}`
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
    const matchesRole = role === 'all' || user.role === role
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Utilisateurs"
        description={`${formatNumber(filtered.length)} utilisateur(s) affiché(s)`}
        actions={<Button>Inviter</Button>}
      />

      <Card>
        <CardBody className="flex flex-wrap gap-3">
          <div className="relative min-w-64 flex-1">
            <HiMagnifyingGlass className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un nom ou un email"
              className="pl-9"
            />
          </div>

          <Select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            options={roleOptions}
            className="w-48"
          />
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-0">
          {filtered.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="Aucun utilisateur trouvé"
                description="Ajustez votre recherche ou vos filtres."
              />
            </div>
          ) : (
            <Table>
              <THead>
                <tr>
                  <TH>Nom</TH>
                  <TH>Rôle</TH>
                  <TH>Statut</TH>
                  <TH>Inscription</TH>
                </tr>
              </THead>
              <TBody>
                {filtered.map((user) => (
                  <TR key={user.id}>
                    <TD>
                      <p className="font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </TD>
                    <TD>{user.role}</TD>
                    <TD>
                      <Badge tone={statusTone[user.status]}>
                        {statusLabel[user.status]}
                      </Badge>
                    </TD>
                    <TD className="text-slate-500">
                      {formatDate(user.joinedAt)}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
