import { motion } from 'motion/react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { cinematicEase } from '../animations/config'
// Mount transition only; routing/exit orchestration belongs to future pages.
export default function PageTransition({ children }) {
  const { reducedMotion } = useMotionPreferences()
  return <motion.div initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.35, ease: cinematicEase }}>{children}</motion.div>
}
