import { useEffect, useRef, useState } from 'react'

/**
 * Pilote une sequence d'authentification etape par etape.
 * Retourne l'etat courant et un demarrage manuel, puis reinitialise
 * et appelle `onSuccess` une fois la sequence terminee.
 */
export function useAuthSequence(steps, { onSuccess, hold = 900 } = {}) {
  const [active, setActive] = useState(false)
  const [current, setCurrent] = useState(0)

  // onSuccess est souvent une arrow function : on la fige pour ne pas
  // relancer le timer a chaque rendu.
  const onSuccessRef = useRef(onSuccess)
  useEffect(() => {
    onSuccessRef.current = onSuccess
  })

  useEffect(() => {
    if (!active || current >= steps.length) return
    const timer = setTimeout(() => setCurrent((c) => c + 1), steps[current].duration)
    return () => clearTimeout(timer)
  }, [active, current, steps])

  useEffect(() => {
    if (!active || current < steps.length) return
    const timer = setTimeout(() => {
      setActive(false)
      setCurrent(0)
      onSuccessRef.current?.()
    }, hold)
    return () => clearTimeout(timer)
  }, [active, current, steps, hold])

  const start = () => {
    setCurrent(0)
    setActive(true)
  }

  return { active, current, start }
}
