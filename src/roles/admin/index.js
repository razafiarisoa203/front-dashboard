import { PERMISSIONS as P } from '../permissions'

export default {
  id: 'admin',
  label: 'Administrateur',
  description:
    'Gère les comptes, les zones et les couches. Ne peut pas attribuer les rôles : cette tâche reste réservée au super administrateur.',
  level: 40,
  permissions: [
    // Consultation
    P.DASHBOARD_VIEW,
    P.ZONES_VIEW,
    P.LAYERS_VIEW,
    P.DATA_VIEW,
    P.DATA_EXPORT,
    // Donnees
    P.ZONES_EDIT,
    P.LAYERS_EDIT,
    P.DATA_IMPORT,
    // Comptes
    P.USERS_VIEW,
    P.USERS_CREATE,
    P.USERS_EDIT,
    P.USERS_DELETE,
    // Restitution
    P.REPORTS_VIEW,
    P.REPORTS_CREATE,
    P.DECISIONS_VIEW,
    P.DECISIONS_VALIDATE,
    // Administration
    P.SETTINGS_VIEW,
    P.SETTINGS_EDIT,
    P.AUDIT_VIEW,
  ],
}
