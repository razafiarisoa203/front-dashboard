import { PERMISSIONS as P } from '../permissions'

export default {
  id: 'decideur',
  label: 'Décideur',
  description:
    ' Consulte les indicateurs, produit les rapports et valide les priorités d’intervention proposées.',
  level: 20,
  permissions: [
    // Consultation
    P.DASHBOARD_VIEW,
    P.ZONES_VIEW,
    P.LAYERS_VIEW,
    P.DATA_VIEW,
    P.DATA_EXPORT,
    // Restitution
    P.REPORTS_VIEW,
    P.REPORTS_CREATE,
    P.DECISIONS_VIEW,
    P.DECISIONS_VALIDATE,
  ],
}
