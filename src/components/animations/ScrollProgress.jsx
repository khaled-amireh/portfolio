import { motion, useScroll } from 'motion/react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const { reducedMotion } = useMotionPreferences()
  if (reducedMotion) return null
  return <motion.div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px origin-left bg-cyan" style={{ scaleX: scrollYProgress }} />
}
