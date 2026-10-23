import { ArrowUp, GitBranch as Github, SquareUserRound as Linkedin } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import '../../styles/contact.css'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const { contact, person } = portfolio
  return <footer className="portfolio-footer"><div className="container-shell portfolio-footer-inner">
    <div className="portfolio-footer-identity"><span className="portfolio-footer-monogram" aria-hidden="true">KA</span><div><p>{person.name}</p><span>Artificial Intelligence</span></div></div>
    <p className="portfolio-footer-copyright">© {currentYear} {person.name}</p>
    <nav className="portfolio-footer-links" aria-label="Footer links"><a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github size={17} aria-hidden="true" /></a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} aria-hidden="true" /></a><a className="portfolio-footer-top" href="#hero">Back to top <ArrowUp size={15} aria-hidden="true" /></a></nav>
  </div></footer>
}
