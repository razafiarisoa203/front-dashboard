export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

export const STORAGE_KEYS = {
  token: 'token',
  user: 'user',
}

export const HTTP_STATUS = {
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
}
