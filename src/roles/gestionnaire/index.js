import { PERMISSIONS as P } from '../permissions'

export default {
  id: 'gestionnaire',
  label: 'Gestionnaire',
  description:
    'Alimente et tient à jour les données du terrain : zones, couches et imports. Ne modifie pas les comptes.',
  level: 30,
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
    // Restitution
    P.REPORTS_VIEW,
    P.REPORTS_CREATE,
  ],
}
