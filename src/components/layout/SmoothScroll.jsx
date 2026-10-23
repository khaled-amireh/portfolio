import { useEffect } from 'react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'

export default function SmoothScroll({ children }) {
  const { reducedMotion } = useMotionPreferences()
  useEffect(() => {
    if (reducedMotion) return
    let cancelled = false
    let dispose
    // Reduced-motion users never download or initialize the scroll engine.
    import('../../hooks/scrollEngine').then(({ createScrollEngine }) => {
      if (!cancelled) dispose = createScrollEngine()
    }).catch((error) => {
      // Native scrolling remains usable if the optional chunk cannot load.
      console.warn('Smooth scrolling unavailable; using native scroll.', error)
    })
    return () => {
      cancelled = true
      dispose?.()
    }
  }, [reducedMotion])
  return children
}
