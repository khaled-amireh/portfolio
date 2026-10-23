import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, GitBranch as Github, SquareUserRound as Linkedin, Mail, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../../data/portfolio'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import '../../styles/contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const root = useRef(null)
  const { reducedMotion } = useMotionPreferences()
  const content = portfolio.contactSection
  const links = portfolio.contact

  useEffect(() => {
    if (reducedMotion || !root.current) return
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 78%', once: true }, defaults: { ease: 'power3.out' } })
        .from('[data-contact-eyebrow]', { opacity: 0, x: -14, duration: .5 })
        .from('[data-contact-heading]', { yPercent: 110, duration: .85, stagger: .13 }, .15)
        .from('[data-contact-copy]', { opacity: 0, y: 16, duration: .6 }, .52)
        .from('[data-contact-action]', { opacity: 0, y: 14, duration: .55, stagger: .1 }, .65)
        .from('[data-contact-social]', { opacity: 0, y: 10, duration: .5, stagger: .08 }, .95)
      gsap.fromTo('.contact-neural-path', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: root.current, start: 'top 78%', once: true } })
    }, root)
    return () => context.revert()
  }, [reducedMotion])

  return <section id="contact" ref={root} className="contact-section" aria-labelledby="contact-title">
    <div className="contact-atmosphere" aria-hidden="true"><svg viewBox="0 0 1300 800" preserveAspectRatio="xMidYMid slice" fill="none"><path className="contact-neural-path" pathLength="1" d="M820 0V120L690 240H830L1010 420H1210M1010 420L900 570H1090L1250 720M690 240L540 400H680" /><path className="contact-neural-path" pathLength="1" d="M1220 80L1040 260H910L810 360M920 670L730 770" /></svg><span className="contact-light contact-light-one" /><span className="contact-light contact-light-two" /></div>
    <div className="container-shell contact-content">
      <div className="contact-topline"><p className="eyebrow" data-contact-eyebrow>{content.eyebrow}</p><span className="contact-topline-symbol" aria-hidden="true"><ArrowDownRight size={19} strokeWidth={1} /></span></div>
      <h2 id="contact-title">{content.heading.map((line) => <span className="contact-text-mask" key={line}><span data-contact-heading>{line}</span></span>)}</h2>
      <div className="contact-lower"><p className="contact-description" data-contact-copy>{content.description}</p><div className="contact-operations"><div className="contact-actions"><a className="contact-primary" href={links.whatsapp} target="_blank" rel="noopener noreferrer" data-contact-action><MessageCircle size={19} strokeWidth={1.7} aria-hidden="true" />{content.primaryAction}<ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" /></a><a className="contact-secondary" href={`mailto:${links.email}`} data-contact-action><Mail size={18} strokeWidth={1.5} aria-hidden="true" />{content.secondaryAction}<ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></a></div><div className="contact-socials" aria-label="Social profiles"><a href={links.github} target="_blank" rel="noopener noreferrer" data-contact-social><Github size={16} strokeWidth={1.5} aria-hidden="true" />GitHub<ArrowUpRight size={13} aria-hidden="true" /></a><a href={links.linkedin} target="_blank" rel="noopener noreferrer" data-contact-social><Linkedin size={16} strokeWidth={1.5} aria-hidden="true" />LinkedIn<ArrowUpRight size={13} aria-hidden="true" /></a></div></div></div>
      <div className="contact-baseline eyebrow" aria-hidden="true"><span>Khaled Amireh / Artificial Intelligence</span><span>End of transmission · Beginning of conversation</span></div>
    </div>
  </section>
}
