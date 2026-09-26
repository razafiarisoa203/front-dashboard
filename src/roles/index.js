import { ALL_PERMISSIONS, WILDCARD } from './permissions'
import superAdmin from './super-admin'
import admin from './admin'
import gestionnaire from './gestionnaire'
import decideur from './decideur'
import utilisateur from './utilisateur'

/** Registre des roles, du plus eleve au plus bas. */
export const ROLES = Object.freeze({
  [superAdmin.id]: superAdmin,
  [admin.id]: admin,
  [gestionnaire.id]: gestionnaire,
  [decideur.id]: decideur,
  [utilisateur.id]: utilisateur,
})

export const ROLE_IDS = Object.freeze(Object.keys(ROLES))

/** Principe du moindre privilege : on ouvre sur le role le plus restrictif. */
export const DEFAULT_ROLE_ID = utilisateur.id

/** Pour les `<select>` de l'interface. */
export const ROLE_OPTIONS = Object.freeze(
  ROLE_IDS.map((id) => ({ value: id, label: ROLES[id].label, level: ROLES[id].level })),
)

export function getRole(id) {
  return ROLES[id] ?? null
}

/**
 * Une permission est accordee si le role la liste explicitement,
 * ou s'il porte le joker. Pas d'heritage implicite : chaque role
 * declare ce qu'il accorde, ce qui evite qu'une elevation de privilege
 * passe inapercue.
 */
export function hasPermission(roleId, permission) {
  if (!permission) return true

  const role = getRole(roleId)
  if (!role) return false
  if (role.permissions.includes(WILDCARD)) return true

  return role.permissions.includes(permission)
}

export function hasEveryPermission(roleId, permissions = []) {
  return permissions.every((permission) => hasPermission(roleId, permission))
}

export function hasAnyPermission(roleId, permissions = []) {
  return permissions.some((permission) => hasPermission(roleId, permission))
}

/** Comparaison hierarchique, pour les seuils du type "administrateur ou plus". */
export function isAtLeast(roleId, level) {
  const role = getRole(roleId)
  return role ? role.level >= level : false
}

/**
 * Permissions reellement accordees, joker developpe. Sert a l'affichage
 * et aux controles de coherence.
 */
export function resolvePermissions(roleId) {
  const role = getRole(roleId)
  if (!role) return []
  if (role.permissions.includes(WILDCARD)) return [...ALL_PERMISSIONS]
  return role.permissions.filter((permission) => ALL_PERMISSIONS.includes(permission))
}

export { ALL_PERMISSIONS, PERMISSIONS } from './permissions'
