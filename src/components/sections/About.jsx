import { useRef } from 'react'
import { portfolio } from '../../data/portfolio'
import { useAboutSequence } from '../../hooks/useAboutSequence'
import AboutPortrait from '../about/AboutPortrait'
import IntelligenceEcosystem from '../about/IntelligenceEcosystem'

function Emphasis({ children }) {
  return children.split(/(Artificial Intelligence|Python|SQL|intelligent systems)/g).map((part, i) =>
    /^(Artificial Intelligence|Python|SQL|intelligent systems)$/.test(part) ? <em key={i}>{part}</em> : part)
}

export default function About() {
  const root = useRef(null)
  useAboutSequence(root)
  const content = portfolio.about
  return <section id="about" className="about-section" ref={root} aria-labelledby="about-title">
    <div className="about-transition-art" aria-hidden="true">
      <svg viewBox="0 0 1440 440" preserveAspectRatio="none" fill="none"><path data-about-line pathLength="1" d="M1100 0V90L940 250H740L640 350H0M1390 30V150L1220 320H1060L940 440" /></svg>
      {[0, 1, 2, 3, 4].map((i) => <span key={i} className={`about-transition-particle about-particle-${i}`} />)}
    </div>
    <div className="container-shell about-inner">
      <header className="about-header">
        <p className="eyebrow" data-about-eyebrow>{content.eyebrow}</p>
        <h2 id="about-title">{content.heading.map((line) => <span className="about-text-mask" key={line}><span data-about-heading>{line}</span></span>)}</h2>
      </header>
      <p className="about-introduction" data-about-story><Emphasis>{content.introduction}</Emphasis></p>
      <div className="about-editorial">
        <AboutPortrait />
        <div className="about-opening" data-about-story>
          <p className="eyebrow">01 / {content.chapters[0]}</p>
          <p className="about-opening-copy"><Emphasis>{content.biography[0]}</Emphasis></p>
        </div>
        <div className="about-academic" data-about-story>
          <span className="about-academic-mark" aria-hidden="true" />
          <p>{content.education.university}</p>
          <p>{content.education.degree}</p>
          <span className="eyebrow">{content.education.standing}</span>
        </div>
        <div className="about-story">
          {content.biography.slice(1).map((paragraph, index) => <div className="about-story-chapter" key={paragraph} data-about-story>
            <p className="eyebrow">0{index + 2} / {content.chapters[index + 1]}</p>
            <p><Emphasis>{paragraph}</Emphasis></p>
            {index === 1 && <p className="about-training-note">{content.training.label}<br />{content.training.organization} · {content.training.dates}</p>}
          </div>)}
        </div>
      </div>
      <IntelligenceEcosystem />
    </div>
  </section>
}
