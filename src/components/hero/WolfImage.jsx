import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import wolfImage from '../../assets/images/Wolf.jpg'

export default function WolfImage({ pointer, cinematic, reducedMotion, active, skipIntro }) {
  const frame = useRef(null)

  useEffect(() => {
    const element = frame.current
    if (reducedMotion) {
      element.style.transform = 'none'
      element.style.opacity = '1'
      return
    }
    if (!active) return
    let request
    let previous = 0
    let x = 0, y = 0
    function update(time) {
      const dt = previous ? Math.min((time - previous) / 1000, 0.05) : 0
      previous = time
      const damping = 1 - Math.exp(-3 * dt)
      x += (pointer.current.x * 9 - x) * damping
      y += (pointer.current.y * -6 - y) * damping
      const progress = cinematic.current.progress
      element.style.transform = `translate3d(${x}px, ${y - progress * 18}px, 0)`
      element.style.opacity = String(1 - Math.max(0, (progress - 0.55) / 0.45))
      request = requestAnimationFrame(update)
    }
    request = requestAnimationFrame(update)
    return () => cancelAnimationFrame(request)
  }, [active, reducedMotion, pointer, cinematic])

  return <div ref={frame} className="wolf-image-parallax">
    <motion.div
      className="wolf-image-entrance"
      initial={reducedMotion || skipIntro ? false : { opacity: 0, scale: 1.015, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`wolf-image-float ${active && !reducedMotion ? 'is-active' : ''}`}>
        <img src={wolfImage} width="1718" height="1718" alt="" decoding="async" fetchPriority="high" draggable="false" />
      </div>
    </motion.div>
  </div>
}
