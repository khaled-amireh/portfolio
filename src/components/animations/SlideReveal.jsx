import { motion } from 'motion/react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { cinematicEase, revealViewport } from './config'
const offsets = { up: { y: 24 }, down: { y: -24 }, left: { x: 24 }, right: { x: -24 } }

export default function SlideReveal({ children, className = '', direction = 'up', delay = 0 }) {
  const { reducedMotion } = useMotionPreferences()
  return <motion.div className={className} initial={reducedMotion ? false : { opacity: 0, ...(offsets[direction] ?? offsets.up) }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={revealViewport} transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : delay, ease: cinematicEase }}>{children}</motion.div>
}
