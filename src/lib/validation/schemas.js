import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Adresse email invalide'),
  password: z.string().min(8, '8 caractères minimum'),
  remember: z.boolean().optional(),
})

export const profileSchema = z.object({
  firstName: z.string().min(2, '2 caractères minimum'),
  lastName: z.string().min(2, '2 caractères minimum'),
  email: z.email('Adresse email invalide'),
  phone: z
    .string()
    .regex(/^[0-9 +.-]{6,20}$/, 'Numéro de téléphone invalide')
    .optional()
    .or(z.literal('')),
})
