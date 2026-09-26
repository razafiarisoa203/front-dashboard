/**
 * Vocabulaire des permissions de l'application.
 *
 * Une permission est une chaine "domaine.action". Les routes declarent la
 * permission qu'elles exigent, chaque role declare celles qu'il accorde :
 * l'autorisation se deduit des deux, sans liste de chemins dupliquee.
 */
export const PERMISSIONS = {
  // Consultation
  DASHBOARD_VIEW: 'dashboard.view',
  ZONES_VIEW: 'zones.view',
  LAYERS_VIEW: 'layers.view',
  DATA_VIEW: 'data.view',
  DATA_EXPORT: 'data.export',

  // Administration des donnees
  ZONES_EDIT: 'zones.edit',
  LAYERS_EDIT: 'layers.edit',
  DATA_IMPORT: 'data.import',

  // Comptes et roles
  USERS_VIEW: 'users.view',
  USERS_CREATE: 'users.create',
  USERS_EDIT: 'users.edit',
  USERS_DELETE: 'users.delete',
  ROLES_MANAGE: 'roles.manage',

  // Restitution
  REPORTS_VIEW: 'reports.view',
  REPORTS_CREATE: 'reports.create',
  DECISIONS_VIEW: 'decisions.view',
  DECISIONS_VALIDATE: 'decisions.validate',

  // Administration
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_EDIT: 'settings.edit',
  AUDIT_VIEW: 'audit.view',
}

export const ALL_PERMISSIONS = Object.values(PERMISSIONS)

/** Permission joker : accorde tout, y compris les permissions a venir. */
export const WILDCARD = '*'
