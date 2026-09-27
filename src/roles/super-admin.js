import { PERMISSIONS as P, WILDCARD } from './permissions'

export default {
  id: 'super-admin',
  label: 'Super administrateur',
  description:
    'Accès complet au système, gestion des comptes, rôles, sécurité et configuration globale.',
  level: 100,
  permissions: [WILDCARD, P.ROLES_MANAGE],
}
