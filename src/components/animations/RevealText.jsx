import { motion } from 'motion/react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { cinematicEase, revealViewport } from './config'

// One accessible text node; no duplicate screen-reader announcement.
export default function RevealText({ children, className = '', delay = 0 }) {
  const { reducedMotion } = useMotionPreferences()
  return <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
    <motion.span className="block" initial={reducedMotion ? false : { y: '110%' }} whileInView={{ y: 0 }} viewport={revealViewport} transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : delay, ease: cinematicEase }}>{children}</motion.span>
  </span>
}
