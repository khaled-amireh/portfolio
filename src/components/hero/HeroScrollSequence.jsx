import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Owns only the outer content wrapper and scalar scene parameters.
// Motion owns inner text; R3F alone writes Three transforms/material uniforms.
export default function HeroScrollSequence({ root, cinematic, reducedMotion, skipIntro, mobile }) {
  // This child reads an ancestor's DOM ref. Passive effects run after all
  // refs attach; a child layout effect runs too early on mount/Strict Mode replay.
  useEffect(() => {
    const element = root.current
    if (!element) return
    const state = cinematic.current
    const content = element.querySelector('.hero-scroll-content')
    if (!content) return
    if (reducedMotion) {
      Object.assign(state, { formation: 1, activation: 1, eyes: 1, pulse: -5, progress: 0, entranceDone: true })
      return
    }
    const context = gsap.context(() => {
      if (skipIntro) {
        Object.assign(state, { formation: 1, activation: 1, eyes: 1, pulse: -5, entranceDone: true })
      } else {
        Object.assign(state, { formation: 0, activation: 0, eyes: 0, pulse: -5, entranceDone: false })
        gsap.timeline()
          .to(state, { formation: 1, duration: 1.45, ease: 'power3.out' }, 0.2)
          .to(state, { activation: 1, duration: 0.7 }, 1.1)
          .fromTo(state, { pulse: 2.4 }, { pulse: -2, duration: 1.25, ease: 'power1.inOut' }, 1.3)
          .to(state, { eyes: 1, duration: 0.55 }, 1.65)
          .call(() => { state.entranceDone = true }, [], 3.25)
      }
      const sequence = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: () => mobile ? `+=${element.offsetHeight * 0.85}` : `+=${Math.max(1, element.offsetHeight - element.querySelector('.hero-stage').offsetHeight)}`,
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const hidden = progress > 0.48 && !content.contains(document.activeElement)
            content.inert = hidden
            if (hidden) content.setAttribute('aria-hidden', 'true')
            else content.removeAttribute('aria-hidden')
          },
        },
      })
      sequence.to(state, { progress: 1, duration: 1, ease: 'none' }, 0)
      sequence.to(content, { y: mobile ? -35 : -75, opacity: 0, duration: 0.45, ease: 'none' }, 0)
      ScrollTrigger.refresh()
    }, element)
    return () => {
      context.revert()
      content.inert = false
      content.removeAttribute('aria-hidden')
      state.progress = 0
    }
  }, [root, cinematic, reducedMotion, skipIntro, mobile])
  return null
}
