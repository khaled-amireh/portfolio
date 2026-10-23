import { useState } from 'react'
import { BrainCircuit, Network, ChartNoAxesCombined, Layers, Languages, Workflow, ArrowUpRight } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

const icons = [BrainCircuit, Network, ChartNoAxesCombined, Layers, Languages, Workflow]

export default function IntelligenceEcosystem() {
  const content = portfolio.about.ecosystem
  const [selected, setSelected] = useState('ai')
  const active = content.nodes.find((node) => node.id === selected)
  return <section className="about-ecosystem" aria-labelledby="ecosystem-title">
    <div className="about-ecosystem-header" data-about-story>
      <p className="eyebrow">{content.eyebrow}</p>
      <h3 id="ecosystem-title">{content.title}</h3>
      <p>{content.description}</p>
    </div>
    <p className="about-network-instruction">{content.instruction}</p>
    <div className="about-network">
      <svg className="about-network-lines" viewBox="0 0 1000 560" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path data-about-line pathLength="1" d="M140 105H430L510 200H850M140 105V340L220 410H510V200M510 200V410H850V105" />
        <path data-about-line pathLength="1" d="M140 115H418L500 212V425H840" className="about-network-secondary" />
      </svg>
      {content.nodes.map((node, index) => {
        const Icon = icons[index]
        return <div className={`about-node about-node-${index + 1}`} key={node.id} data-about-node>
          <button type="button" aria-pressed={selected === node.id} aria-controls="about-network-detail" onClick={() => setSelected(node.id)}>
            <span className="about-node-top"><span className="eyebrow">0{index + 1}</span><Icon size={19} strokeWidth={1.2} aria-hidden="true" /></span>
            <span className="about-node-label">{node.label}</span>
            <span className="about-node-category eyebrow">{node.category}</span>
            <span className="about-node-description">{node.description}</span>
            <ArrowUpRight className="about-node-arrow" size={14} aria-hidden="true" />
          </button>
        </div>
      })}
    </div>
    <div className="about-network-detail" id="about-network-detail" aria-live="polite" aria-atomic="true">
      <span className="eyebrow">{active.label}</span><p>{active.detail}</p>
    </div>
  </section>
}
