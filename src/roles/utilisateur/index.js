import { PERMISSIONS as P } from '../permissions'

/**
 * Role par defaut : consultation seule, le strict necessaire pour
 * ouvrir le tableau de bord. Tout le reste demande une elevation.
 */
export default {
  id: 'utilisateur',
  label: 'Utilisateur simple',
  description: 'Consultation du tableau de bord et des couches, sans modification ni export.',
  level: 10,
  permissions: [P.DASHBOARD_VIEW, P.ZONES_VIEW, P.LAYERS_VIEW, P.DATA_VIEW],
}
