import { useEffect, useRef, useState } from 'react'
import { Activity } from 'lucide-react'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import { useDeviceQuality } from '../../hooks/useDeviceQuality'
import { portfolio } from '../../data/portfolio'
import HeroContent from './HeroContent'
import HeroAtmosphere from './HeroAtmosphere'
import WolfImage from './WolfImage'
import HeroScrollSequence from './HeroScrollSequence'
import { createCinematicState } from './heroMotion'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Experience from '../sections/Experience'
import Certifications from '../sections/Certifications'
import Contact from '../sections/Contact'

export default function Hero() {
  const root = useRef(null)
  const cinematic = useRef(createCinematicState())
  const pointer = useRef({ x: 0, y: 0 })
  const { reducedMotion, systemReducedMotion, reduceMotion, setReduceMotion } = useMotionPreferences()
  const quality = useDeviceQuality()
  const [active, setActive] = useState(true)
  const [skipIntro] = useState(() => typeof window !== 'undefined' && (window.scrollY > 80 || Boolean(window.location.hash)))

  useEffect(() => {
    let visible = true
    const update = () => setActive(visible && document.visibilityState !== 'hidden')
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() }, { threshold: 0 })
    observer.observe(root.current)
    document.addEventListener('visibilitychange', update)
    update()
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])

  function onPointerMove(event) {
    if (reducedMotion || quality.coarse || event.pointerType !== 'mouse' || !cinematic.current.entranceDone) return
    const bounds = event.currentTarget.firstElementChild.getBoundingClientRect()
    pointer.current.x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1))
    pointer.current.y = Math.max(-1, Math.min(1, 1 - (event.clientY - bounds.top) / bounds.height * 2))
  }

  const hero = portfolio.hero
  return <>
    <section id="hero" ref={root} className={`hero-track ${reducedMotion ? 'hero-reduced' : ''}`} aria-label="Introduction" onPointerMove={onPointerMove} onPointerLeave={() => { pointer.current.x = 0; pointer.current.y = 0 }}>
      <div className="hero-stage">
        <HeroAtmosphere />
        <div className="hero-visual hero-wolf-image" aria-hidden="true">
          <WolfImage pointer={pointer} cinematic={cinematic} reducedMotion={reducedMotion} active={active} skipIntro={skipIntro} />
        </div>
        <div className="hero-art-caption eyebrow" aria-hidden="true"><span />{hero.sculptureLabel}</div>
        <HeroContent immediate={reducedMotion || skipIntro} />
        <div className="hero-motion-control">
          <button type="button" className="motion-toggle eyebrow" aria-label="Reduce motion" aria-pressed={reducedMotion} disabled={systemReducedMotion} onClick={() => setReduceMotion(!reduceMotion)}>
            <Activity size={12} aria-hidden="true" />{reducedMotion ? 'Motion reduced' : 'Motion enabled'}
          </button>
        </div>
      </div>
      <HeroScrollSequence root={root} cinematic={cinematic} reducedMotion={reducedMotion} skipIntro={skipIntro} mobile={quality.mobile} />
    </section>
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Certifications />
    <Contact />
  </>
}
