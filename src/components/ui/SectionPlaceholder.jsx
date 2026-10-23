import { portfolio } from '../../data/portfolio'
// Opt-in only: future sections are scaffolded but never mounted in Phase 1.
export default function SectionPlaceholder({ id, preview = false }) {
  if (!preview) return null
  const section = portfolio.sections.find((entry) => entry.id === id)
  if (!section) return null
  return <section id={id} className="container-shell py-section" aria-labelledby={`${id}-title`}><p className="eyebrow text-muted">Placeholder · Content pending</p><h2 id={`${id}-title`} className="text-section">{section.label}</h2></section>
}
