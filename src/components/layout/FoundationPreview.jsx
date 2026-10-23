import { ArrowDownRight, MoveRight, Activity } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import RevealText from '../animations/RevealText'
import SlideReveal from '../animations/SlideReveal'
import MagneticButton from '../animations/MagneticButton'
import NeuralBlueprint from '../ui/NeuralBlueprint'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'

// Temporary theme preview, deliberately separate from the future Hero.
export default function FoundationPreview() {
  const { reducedMotion, systemReducedMotion, reduceMotion, setReduceMotion } = useMotionPreferences()
  const { site, sections } = portfolio
  return <>
    <section id="foundation" className="foundation container-shell" aria-labelledby="foundation-title">
      <div className="foundation-heading"><p className="eyebrow text-cyan">01 / {site.status}</p><p className="eyebrow text-muted edition">Artificial intelligence · Personal portfolio</p></div>
      <div className="foundation-layout">
        <div className="foundation-copy">
          <p className="eyebrow mb-7 text-muted">{site.eyebrow}</p>
          <h1 id="foundation-title"><RevealText>{site.heading[0]}</RevealText><RevealText className="accent-line" delay={0.12}>{site.heading[1]}</RevealText></h1>
          <SlideReveal delay={0.2}><p className="foundation-description">{site.introduction}</p><MagneticButton href="#section-index" className="outline-button">{site.action}<ArrowDownRight size={16} className="text-cyan" aria-hidden="true" /></MagneticButton></SlideReveal>
        </div>
        <NeuralBlueprint />
      </div>
      <div className="foundation-bottom"><p className="eyebrow text-muted">{site.placeholderNotice}</p><button type="button" className="motion-toggle eyebrow" aria-pressed={reducedMotion} aria-label="Reduce motion" disabled={systemReducedMotion} onClick={() => setReduceMotion(!reduceMotion)}><Activity size={13} aria-hidden="true" />{systemReducedMotion ? 'Reduced motion · System preference' : reducedMotion ? 'Reduced motion' : 'Motion enabled'}</button></div>
    </section>
    <section id="section-index" className="module-index container-shell" aria-labelledby="index-title">
      <div className="module-heading"><h2 id="index-title">{site.indexTitle}</h2><p className="eyebrow text-muted">{site.indexNote}</p></div>
      <ol className="module-list">{sections.map((section, index) => <li key={section.id} className="module-item"><span className="module-number">{String(index + 1).padStart(2, '0')}</span><span className="module-name">{section.label}</span><span className="module-status">Pending</span><MoveRight size={12} className="mr-4 text-teal" aria-hidden="true" /></li>)}</ol>
    </section>
  </>
}
