import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionPreferences } from './useMotionPreferences'

gsap.registerPlugin(ScrollTrigger)

export function useAboutSequence(root) {
  const { reducedMotion } = useMotionPreferences()
  useEffect(() => {
    if (reducedMotion || !root.current) return
    const context = gsap.context(() => {
      const element = root.current
      const compact = window.matchMedia('(max-width: 767px)').matches
      const intro = gsap.timeline({ scrollTrigger: { trigger: element, start: 'top 82%', once: true } })
      intro.from('[data-about-eyebrow]', { opacity: 0, x: -16, duration: 0.6 })
        .from('[data-about-heading]', { yPercent: 108, duration: compact ? 0.65 : 1, stagger: 0.13, ease: 'power3.out' }, 0.15)
      gsap.utils.toArray('[data-about-line]').forEach((line) => {
        gsap.fromTo(line, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: line.closest('.about-network') || element, start: 'top 85%', end: 'center 35%', scrub: 0.8 } })
      })
      gsap.from('[data-about-portrait]', { clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: '[data-about-portrait]', start: 'top 85%', once: true } })
      gsap.to('.about-light-sweep', { xPercent: 220, duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: '[data-about-portrait]', start: 'top 65%', once: true } })
      gsap.fromTo('[data-about-parallax]', { y: compact ? 4 : 10 }, { y: compact ? -4 : -10, ease: 'none', scrollTrigger: { trigger: '[data-about-portrait]', start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
      gsap.utils.toArray('[data-about-story]').forEach((block) => {
        gsap.from(block, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: block, start: 'top 90%', once: true } })
      })
      gsap.from('[data-about-node]', { y: 18, opacity: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: '.about-network', start: 'top 85%', once: true } })
      gsap.to('.about-transition-particle', { y: -28, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'top top', scrub: 1 } })
    }, root)
    return () => context.revert()
  }, [root, reducedMotion])
}
