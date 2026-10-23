import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react'
import MagneticButton from '../animations/MagneticButton'
import { cinematicEase } from '../animations/config'
import { introTiming } from './heroMotion'
import { portfolio } from '../../data/portfolio'

export default function HeroContent({ immediate }) {
  const hero = portfolio.hero
  function reveal(key, y = 12) {
    return {
      initial: immediate ? false : { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      transition: { delay: immediate ? 0 : introTiming[key], duration: immediate ? 0 : 0.8, ease: cinematicEase },
    }
  }
  return <div className="hero-scroll-content container-shell">
    <div className="hero-copy">
      <motion.p className="hero-eyebrow eyebrow" {...reveal('eyebrow')}>
        <span className="hero-eyebrow-line" aria-hidden="true" />{hero.eyebrow}
      </motion.p>
      <h1 className="hero-name">
        <span className="hero-text-mask"><motion.span {...reveal('firstName', '105%')}>{hero.firstName}</motion.span></span>
        <span className="sr-only"> </span>
        <span className="hero-text-mask hero-last-name"><motion.span {...reveal('lastName', '105%')}>{hero.lastName}<span className="hero-name-period" aria-hidden="true">.</span></motion.span></span>
      </h1>
      <p className="hero-statement">
        <span className="hero-statement-mask"><motion.span {...reveal('statement', '105%')}>{hero.statement[0]}</motion.span></span>
        <span className="hero-statement-mask hero-statement-secondary"><motion.span {...reveal('description', '105%')}>{hero.statement[1]}</motion.span></span>
      </p>
      <motion.p className="hero-description" {...reveal('description')}>{hero.description}</motion.p>
      <motion.div className="hero-actions hero-reveal" {...reveal('actions')}>
        <MagneticButton href={hero.primaryAction.href} className="hero-button hero-button-primary">
          {hero.primaryAction.label}<ArrowUpRight size={17} aria-hidden="true" />
        </MagneticButton>
        <MagneticButton href={hero.secondaryAction.href} className="hero-button hero-button-secondary">
          {hero.secondaryAction.label}<MoveUpRight size={15} aria-hidden="true" />
        </MagneticButton>
      </motion.div>
    </div>
    <motion.div className="hero-bottom" {...reveal('details', 0)}>
      <span className="hero-status eyebrow"><span aria-hidden="true" />{hero.status}</span>
      <a href="#about" className="hero-scroll-link eyebrow">{hero.scrollHint}<ArrowDown size={14} aria-hidden="true" /></a>
    </motion.div>
  </div>
}
