import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'

export default function MagneticButton({ children, href, className = '', ...props }) {
  const { reducedMotion } = useMotionPreferences()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 24 })
  const springY = useSpring(y, { stiffness: 240, damping: 24 })
  const Component = href ? motion.a : motion.button
  const reset = () => { x.set(0); y.set(0) }
  useEffect(() => { if (reducedMotion) { x.set(0); y.set(0) } }, [reducedMotion, x, y])
  function handleMove(event) {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.08)
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.08)
  }
  return <Component {...props} href={href} type={href ? undefined : (props.type ?? 'button')} className={className} style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }} onPointerMove={handleMove} onPointerLeave={reset} onBlur={reset}>{children}</Component>
}
