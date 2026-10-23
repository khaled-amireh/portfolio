import { ArrowUpRight, ScanLine } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
export default function Navbar() {
  return <header className="container-shell"><div className="site-header">
    <a href="#hero" className="brand" aria-label="KA Intelligence home"><span className="brand-symbol"><ScanLine size={17} strokeWidth={1.3} aria-hidden="true" /></span>{portfolio.site.brand}</a>
    <nav aria-label="Main navigation" className="nav-links">{portfolio.site.navigation.map((item) => <a key={item.href} href={item.href} className="text-link">{item.label}{item.label === 'Index' && <ArrowUpRight size={12} aria-hidden="true" />}</a>)}</nav>
    <span className="phase-label eyebrow header-phase"><span className="status-dot" aria-hidden="true" />Creative technology</span>
  </div></header>
}
