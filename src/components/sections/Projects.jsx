import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, GitBranch as Github, Maximize2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../../data/portfolio'
import { useMotionPreferences } from '../../hooks/useMotionPreferences'
import ProjectDetails from './ProjectDetails'
import '../../styles/projects.css'

gsap.registerPlugin(ScrollTrigger)
const number = (i) => String(i + 1).padStart(2, '0')
const coverDimensions = {
  fraud: [1200, 654], loan: [1536, 1024], churn: [1358, 905],
  football: [1200, 791], flipkart: [1280, 719], house: [980, 535],
}

export default function Projects() {
  const root = useRef(null)
  const slide = useRef(null)
  const navigation = useRef(null)
  const direction = useRef(1)
  const [index, setIndex] = useState(0)
  const { reducedMotion } = useMotionPreferences()
  const project = portfolio.projects[index]
  const content = portfolio.projectsSection

  useEffect(() => {
    if (reducedMotion) return
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } })
        .from('[data-projects-heading]', { yPercent: 110, duration: .8, stagger: .1, ease: 'power3.out' })
        .from('.projects-intro', { y: 14, opacity: 0, duration: .6 }, .25)
    }, root)
    return () => context.revert()
  }, [reducedMotion])

  useLayoutEffect(() => {
    if (reducedMotion) return
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.project-art', { clipPath: direction.current > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)', opacity: .3, duration: .75 })
        .from('.project-art img', { x: direction.current * 14, scale: 1.025, duration: .9 }, 0)
        .from('[data-project-title]', { yPercent: 105, duration: .65, stagger: .05 }, .1)
        .from('[data-project-reveal]', { y: 10, opacity: 0, stagger: .055, duration: .5 }, .25)
        .from('.project-counter-current', { y: direction.current * 10, opacity: 0, duration: .45 }, .1)
    }, slide)
    return () => context.revert()
  }, [index, reducedMotion])

  useEffect(() => {
    const nav = navigation.current
    if (!nav || !window.matchMedia('(max-width: 1023px)').matches) return
    const active = nav.querySelector('[aria-current="true"]')
    if (!active) return
    const navBounds = nav.getBoundingClientRect()
    const activeBounds = active.getBoundingClientRect()
    const left = nav.scrollLeft + activeBounds.left - navBounds.left - (nav.clientWidth - activeBounds.width) / 2
    nav.scrollTo({ left: Math.max(0, left), behavior: reducedMotion ? 'instant' : 'smooth' })
  }, [index, reducedMotion])

  function select(next, travel) {
    const normalized = (next + portfolio.projects.length) % portfolio.projects.length
    if (normalized === index) return
    direction.current = travel ?? (normalized > index ? 1 : -1)
    setIndex(normalized)
  }

  return <section id="projects" className="projects-section" ref={root} aria-labelledby="projects-title" style={{ '--project-accent': project.accent }}>
    <div className="container-shell">
      <header className="projects-header"><p className="eyebrow">{content.eyebrow}</p><h2 id="projects-title">{content.heading.map((line) => <span className="projects-mask" key={line}><span data-projects-heading>{line}</span></span>)}</h2><div className="projects-intro"><span className="projects-editorial-line" aria-hidden="true" /><p>{content.description}</p></div></header>
      <div className="projects-gallery" role="region" aria-roledescription="carousel" aria-label="Selected projects" onKeyDown={(event) => {
        if (event.target.closest('details, a')) return
        if (event.key === 'ArrowRight') { event.preventDefault(); select(index + 1, 1) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); select(index - 1, -1) }
      }}>
        <div className="projects-gallery-bar"><span className="eyebrow">Research into practice</span><span className="eyebrow">Six studies / One curiosity</span></div>
        <nav ref={navigation} className="projects-index" aria-label="Choose a project"><span className="projects-index-label eyebrow" aria-hidden="true">Project index / 06</span>{portfolio.projects.map((item, i) => <button key={item.id} type="button" aria-current={i === index ? 'true' : undefined} onClick={() => select(i)}><span className="eyebrow">{number(i)}</span><span>{item.title}</span><ArrowUpRight size={14} aria-hidden="true" /></button>)}</nav>
        <article ref={slide} className={`project-slide project-slide-${project.id}`} aria-labelledby="featured-project-title">
          <div className="project-story">
            <div className="project-overline" data-project-reveal><span className="project-counter"><span className="project-counter-current">{number(index)}</span><span>/ 06</span></span><p className="eyebrow">{project.category}</p></div>
            <h3 id="featured-project-title" className="project-title">{project.title.split(' ').reduce((lines, word) => { if (!lines.length || lines[lines.length - 1].length + word.length > 19) lines.push(word); else lines[lines.length - 1] += ` ${word}`; return lines }, []).map((line) => <span className="projects-mask" key={line}><span data-project-title>{line}</span></span>)}</h3>
            <p className="project-description" data-project-reveal>{project.description}</p>
            <ul className="project-tags" aria-label="Technologies">{project.technologies.map((tag) => <li key={tag} data-project-reveal>{tag}</li>)}</ul>
            <a className="project-github" href={project.github} target="_blank" rel="noreferrer" data-project-reveal><Github size={17} aria-hidden="true" />View on GitHub<ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <figure className="project-visual">
            <div className="project-visual-heading" data-project-reveal><span className="eyebrow">{project.model}</span><span className="project-visual-number" aria-hidden="true">{number(index)}</span></div>
            <a className="project-art" href={project.cover} target="_blank" rel="noreferrer" aria-label={`Open full-size visual for ${project.title}`}><img src={project.cover} alt={project.coverAlt} width={coverDimensions[project.id][0]} height={coverDimensions[project.id][1]} loading="lazy" decoding="async" /><span className="project-expand"><Maximize2 size={14} aria-hidden="true" /><span>Inspect visual</span></span></a>
            <figcaption data-project-reveal>{project.coverCaption}</figcaption>
            <div className="project-result" data-project-reveal>{project.metric ? <><strong>{project.metric.value}</strong><div><span className="eyebrow">{project.metric.label}</span><p>{project.metric.context}</p></div></> : <><span className="project-result-symbol" aria-hidden="true">↗</span><div><span className="eyebrow">{project.id === 'loan' ? 'Credit risk study' : 'Interactive exploration'}</span><p>{project.id === 'loan' ? 'From borrower attributes to default classification.' : 'From sales records to a filterable business view.'}</p></div></>}</div>
          </figure>
          <ProjectDetails key={project.id} project={project} />
        </article>
        <div className="projects-navigation"><p className="project-storyline">{project.shortTitle}</p><div className="projects-arrows"><button type="button" aria-label="Previous project" onClick={() => select(index - 1, -1)}><ArrowLeft size={20} /></button><button type="button" aria-label="Next project" onClick={() => select(index + 1, 1)}><ArrowRight size={20} /></button></div></div>
        <p className="projects-announcement" aria-live="polite" aria-atomic="true">Project {index + 1} of 6: {project.title}</p>
      </div>
    </div>
  </section>
}
