import { useEffect, useRef, useState } from 'react'
import { Braces, ChartNoAxesCombined, GitBranch, Database, BrainCircuit, ChevronDown, RotateCcw } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../../data/portfolio'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import '../../styles/skills.css'

gsap.registerPlugin(ScrollTrigger)
const icons = [Braces, ChartNoAxesCombined, GitBranch, Database]
const paths = ['M500 300H425L345 130H270', 'M500 300H580L660 165H730', 'M500 300H425L345 440H270', 'M500 300H580L660 475H730']

function SkillCluster({ category, index, mobile, selected, active, expanded, onSelect, onPreview, onExpand }) {
  const Icon = icons[index]
  return <div className={`skills-cluster skills-cluster-${index}`} data-skills-cluster data-active={active}>
    <div className="skills-cluster-content" onMouseEnter={() => onPreview(category.id)} onMouseLeave={() => onPreview(null)}>
      <h3><button type="button" className="skills-category-control" aria-pressed={selected} aria-describedby={`skills-description-${category.id}`} onFocus={() => onPreview(category.id)} onBlur={() => onPreview(null)} onClick={onSelect}>
        <span className="skills-category-index eyebrow">0{index + 1}<Icon size={18} strokeWidth={1.3} aria-hidden="true" /></span>
        <span>{category.label}</span>
      </button></h3>
      <p className="skills-category-description" id={`skills-description-${category.id}`}>{category.description}</p>
      {mobile && <button className="skills-expand" type="button" aria-expanded={expanded} aria-controls={`skills-tools-${category.id}`} onClick={onExpand}>{expanded ? 'Hide tools' : 'Show tools'}<ChevronDown size={14} aria-hidden="true" /></button>}
      <div className="skills-tools-reveal" data-expanded={!mobile || expanded} inert={mobile && !expanded ? true : undefined} aria-hidden={mobile && !expanded ? true : undefined}>
        <ul className="skills-tools" id={`skills-tools-${category.id}`}>{category.tools.map((tool) => <li key={tool} data-skills-tool><span aria-hidden="true" />{tool}</li>)}</ul>
      </div>
    </div>
  </div>
}

export default function Skills() {
  const root = useRef(null)
  const [selected, setSelected] = useState(null)
  const [preview, setPreview] = useState(null)
  const [collapsed, setCollapsed] = useState([])
  const mobile = useMediaQuery('(max-width: 767px)')
  const { reducedMotion } = useMotionPreferences()
  const active = preview ?? selected
  const content = portfolio.skillsSection
  const activeCategory = portfolio.skills.find((category) => category.id === active)

  useEffect(() => {
    if (reducedMotion) return
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: root.current, start: 'top 80%', once: true } })
      timeline.from('[data-skills-eyebrow]', { opacity: 0, x: -12, duration: .4 })
        .from('[data-skills-heading]', { yPercent: 110, duration: .7, stagger: .1 }, .1)
        .from('[data-skills-intro]', { opacity: 0, y: 12, duration: .5 }, .4)
      // The network has its own entrance so scrolling never leaves hidden tools far below the heading.
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: '.skills-network', start: 'top 85%', once: true } })
        .from('[data-skills-core]', { opacity: 0, scale: .94, duration: .55 })
        .fromTo('[data-skills-path]', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .65, stagger: .08 }, .2)
        .from('[data-skills-cluster]', { opacity: 0, y: mobile ? 8 : 14, duration: .5, stagger: .1 }, .45)
        .from('[data-skills-tool]', { opacity: 0, y: 5, duration: .35, stagger: .025 }, .8)
    }, root)
    return () => context.revert()
  }, [reducedMotion, mobile])

  function clear() { setSelected(null); setPreview(null); setCollapsed([]) }
  return <section className="skills-section" id="skills" ref={root} aria-labelledby="skills-title" onKeyDown={(event) => { if (event.key === 'Escape') clear() }}>
    <div className="container-shell">
      <header className="skills-header">
        <p className="eyebrow" data-skills-eyebrow>{content.eyebrow}</p>
        <h2 id="skills-title">{content.heading.map((line) => <span className="skills-text-mask" key={line}><span data-skills-heading>{line}</span></span>)}</h2>
        <p className="skills-introduction" data-skills-intro>{content.description}</p>
      </header>
      <div className="skills-toolbar"><p>{content.instruction}</p><button type="button" onClick={clear}><RotateCcw size={13} aria-hidden="true" />{content.reset}</button></div>
      <div className="skills-network" data-focused={Boolean(active)}>
        <svg className="skills-pathways" viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none" aria-hidden="true">{paths.map((path, i) => <path key={path} d={path} pathLength="1" data-skills-path data-active={active === portfolio.skills[i].id} />)}</svg>
        <div className="skills-core" data-skills-core aria-hidden="true"><div className="skills-core-rings"><span /><span /><span /></div><BrainCircuit size={34} strokeWidth={1} /><span className="eyebrow">{content.coreLabel}</span></div>
        {portfolio.skills.map((category, index) => <SkillCluster key={category.id} category={category} index={index} mobile={mobile} selected={selected === category.id} active={active === category.id} expanded={!collapsed.includes(category.id)} onPreview={setPreview} onSelect={() => { setSelected(selected === category.id ? null : category.id); setPreview(null) }} onExpand={() => setCollapsed((previous) => previous.includes(category.id) ? previous.filter((id) => id !== category.id) : [...previous, category.id])} />)}
      </div>
      <div className="skills-context" aria-live="polite" aria-atomic="true"><span className="eyebrow">{activeCategory?.label ?? content.coreLabel}</span><p>{activeCategory?.description ?? content.overview}</p></div>
    </div>
  </section>
}
