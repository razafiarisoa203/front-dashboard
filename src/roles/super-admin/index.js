/**
 * Acces total. Le joker '*' accorde aussi les permissions ajoutees
 * ulterieurement, sans avoir a mettre a jour cette definition.
 */
export default {
  id: 'super-admin',
  label: 'Super administrateur',
  description: 'Accès total, y compris l’attribution des rôles et la configuration du système.',
  level: 50,
  permissions: ['*'],
}
