import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { MotionContext } from './MotionContext'
import { useMediaQuery } from '../hooks/useMediaQuery'

export function MotionProvider({ children }) {
  const systemReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [reduceMotion, setReduceMotion] = useState(false)
  const reducedMotion = Boolean(systemReducedMotion || reduceMotion)
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reducedMotion)
    return () => { delete document.documentElement.dataset.reducedMotion }
  }, [reducedMotion])
  return <MotionContext.Provider value={{ reducedMotion, systemReducedMotion: Boolean(systemReducedMotion), reduceMotion, setReduceMotion }}>
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>{children}</MotionConfig>
  </MotionContext.Provider>
}
