import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../../data/portfolio'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import Education from './Education'
import '../../styles/journey.css'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const root = useRef(null)
  const { reducedMotion } = useMotionPreferences()
  const { journeySection: content } = portfolio
  const experience = portfolio.experience[0]

  useEffect(() => {
    if (reducedMotion || !root.current) return
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 82%', once: true }, defaults: { ease: 'power3.out' } })
        .from('[data-journey-eyebrow]', { opacity: 0, x: -12, duration: .5 })
        .from('[data-journey-heading]', { yPercent: 110, duration: .75, stagger: .1 }, .1)
        .from('[data-journey-intro]', { opacity: 0, y: 14, duration: .55 }, .35)
      gsap.fromTo('.journey-spine-progress', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.journey-timeline', start: 'top 82%', end: 'bottom 65%', scrub: .6 } })
      gsap.utils.toArray('[data-journey-entry]').forEach((entry) => {
        gsap.from(entry.querySelectorAll('.journey-date, .journey-content'), {
          opacity: 0, y: 22, duration: .8, stagger: .13, ease: 'power3.out',
          scrollTrigger: { trigger: entry, start: 'top 85%', once: true },
        })
      })
    }, root)
    return () => context.revert()
  }, [reducedMotion])

  return <section id="experience" ref={root} className="journey-section" aria-labelledby="experience-title">
    <div className="container-shell">
      <header className="journey-header"><p className="eyebrow" data-journey-eyebrow>{content.eyebrow}</p><h2 id="experience-title">{content.heading.map((line) => <span className="journey-text-mask" key={line}><span data-journey-heading>{line}</span></span>)}</h2><p data-journey-intro>{content.introduction}</p></header>
      <div className="journey-timeline"><div className="journey-spine" aria-hidden="true"><span className="journey-spine-progress" /></div>
        <article className="journey-entry journey-experience" aria-labelledby="journey-role" data-journey-entry>
          <div className="journey-rail" aria-hidden="true"><span className="journey-node" /></div>
          <div className="journey-date"><span className="eyebrow">{content.experienceLabel}</span><p><time dateTime={experience.start}>July 2026</time><span aria-hidden="true"> — </span><time dateTime={experience.end}>September 2026</time></p></div>
          <div className="journey-content"><div className="journey-content-top"><span className="eyebrow">Professional practice</span><ArrowUpRight size={17} strokeWidth={1} aria-hidden="true" /></div><h3 id="journey-role">{experience.role}</h3><p className="journey-organization">{experience.organization}</p><p className="journey-summary">{experience.summary}</p><ul className="journey-responsibilities">{experience.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul><ul className="journey-technologies" aria-label="Technologies used">{experience.technologies.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </article>
        <Education />
      </div>
    </div>
  </section>
}
