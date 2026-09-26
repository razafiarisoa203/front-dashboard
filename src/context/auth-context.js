import { createContext } from 'react'

/**
 * Contexte isole dans son propre fichier : le rechargement rapide de React
 * ne fonctionne que si un fichier n'exporte que des composants.
 */
export const AuthContext = createContext(null)
