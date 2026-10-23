import { useEffect, useRef } from 'react'
import { ArrowUpRight, Maximize2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../../data/portfolio'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import '../../styles/certifications.css'

gsap.registerPlugin(ScrollTrigger)

function CertificateExhibit({ certificate, index }) {
  return <article className={`credential-exhibit credential-exhibit-${certificate.id}`} aria-labelledby={`credential-${certificate.id}`} data-credential>
    <div className="credential-image-wrap" data-credential-image>
      <span className="credential-image-corner" aria-hidden="true" />
      <a href={certificate.image} target="_blank" rel="noopener noreferrer" aria-label={`View full-size image of ${certificate.title}`}>
        <img src={certificate.image} width={certificate.imageWidth} height={certificate.imageHeight} alt={certificate.imageAlt} loading="lazy" decoding="async" />
        <span className="credential-image-expand"><Maximize2 size={15} aria-hidden="true" /> View full size</span>
      </a>
    </div>
    <div className="credential-story" data-credential-story>
      <div className="credential-story-top"><span className="eyebrow">0{index + 1} / 02</span><span className="credential-issuer-mark" aria-hidden="true">{certificate.id === 'pcep' ? 'PI' : 'U'}</span></div>
      <p className="credential-type eyebrow">{certificate.type}</p>
      <h3 id={`credential-${certificate.id}`}>{certificate.title}</h3>
      <p className="credential-issuer">{certificate.issuer}</p>
      <dl className="credential-facts">
        <div><dt>Issued</dt><dd><time dateTime={certificate.dateTime}>{certificate.date}</time></dd></div>
        {certificate.credential && <div><dt>Credential</dt><dd>{certificate.credential}</dd></div>}
        {certificate.instructor && <div><dt>Instructor</dt><dd>{certificate.instructor}</dd></div>}
        {certificate.duration && <div><dt>Course length</dt><dd>{certificate.duration}</dd></div>}
      </dl>
      <a className="credential-action" href={certificate.url} target="_blank" rel="noopener noreferrer">{certificate.action}<ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></a>
    </div>
  </article>
}

export default function Certifications() {
  const root = useRef(null)
  const { reducedMotion } = useMotionPreferences()
  const content = portfolio.certificationsSection

  useEffect(() => {
    if (reducedMotion || !root.current) return
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 82%', once: true }, defaults: { ease: 'power3.out' } })
        .from('[data-credentials-eyebrow]', { opacity: 0, x: -12, duration: .45 })
        .from('[data-credentials-heading]', { yPercent: 110, duration: .75, stagger: .1 }, .1)
        .from('[data-credentials-intro]', { opacity: 0, y: 13, duration: .55 }, .35)
      gsap.utils.toArray('[data-credential]').forEach((entry) => {
        gsap.timeline({ scrollTrigger: { trigger: entry, start: 'top 83%', once: true }, defaults: { ease: 'power3.out' } })
          .from(entry.querySelector('[data-credential-image]'), { clipPath: 'inset(8% 0 8% 0)', opacity: .2, y: 18, duration: .85 })
          .from(entry.querySelector('[data-credential-story]'), { opacity: 0, y: 18, duration: .7 }, .22)
      })
    }, root)
    return () => context.revert()
  }, [reducedMotion])

  return <section className="credentials-section" id="certifications" ref={root} aria-labelledby="credentials-title">
    <div className="container-shell">
      <header className="credentials-header"><p className="eyebrow" data-credentials-eyebrow>{content.eyebrow}</p><h2 id="credentials-title">{content.heading.map((line) => <span className="credentials-text-mask" key={line}><span data-credentials-heading>{line}</span></span>)}</h2><p data-credentials-intro>{content.description}</p></header>
      <div className="credentials-exhibition">{portfolio.certifications.map((certificate, index) => <CertificateExhibit key={certificate.id} certificate={certificate} index={index} />)}</div>
    </div>
  </section>
}
