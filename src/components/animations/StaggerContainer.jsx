import { motion } from 'motion/react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { cinematicEase, revealViewport } from './config'

// Pair with StaggerItem; children inherit variants without independent observers.
export default function StaggerContainer({ children, className = '', stagger = 0.06 }) {
  const { reducedMotion } = useMotionPreferences()
  return <motion.div className={className} initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={revealViewport} variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : stagger } } }}>{children}</motion.div>
}
export function StaggerItem({ children, className = '' }) {
  const { reducedMotion } = useMotionPreferences()
  return <motion.div className={className} variants={{ hidden: { opacity: 0, y: reducedMotion ? 0 : 16 }, visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.5, ease: cinematicEase } } }}>{children}</motion.div>
}
